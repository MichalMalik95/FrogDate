using System.Security.Claims;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FrogDate.API.Data;
using FrogDate.API.Dtos;
using FrogDate.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FrogDate.API.Controllers
{
    
[Authorize]
[Microsoft.AspNetCore.Mvc.Route("api/users/{userId}/photos")]
[ApiController]

public class PhotosController :ControllerBase
{
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IUserRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repository = repository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.APIKey,
                _cloudinaryConfig.Value.APISecret
            );
             _cloudinary=new Cloudinary(account);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,[FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (int.TryParse(User?.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int result) && result != userId)
                return Unauthorized();

            var userFromRepo= await _repository.GetUser(userId);
            var file=photoForCreationDto.File;
            var uploadResult=new ImageUploadResult();

            if(file.Length>0)
            {
                using (var stream=file.OpenReadStream())
                {
                    var uploadParams=new ImageUploadParams()
                    {
                        File=new FileDescription(file.Name, stream),
                        Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult=_cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo=_mapper.Map<Photo>(photoForCreationDto);

            if(!userFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain=true;

            userFromRepo.Photos.Add(photo);
            if(await _repository.SaveAll())
            {
                var photoToReturn=_mapper.Map<PhotoForReturnDto>(photo);
                return Ok(photoToReturn);
                //return CreatedAtRoute(
                //    routeName: "GetPhoto",
                //    routeValues: new { id = photo.Id },
                //    value: photoToReturn); ;
            }


            return BadRequest("You can not add photo");
        }
        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo=await _repository.GetPhoto(id);
            var photoForReturn=_mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photoForReturn);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user =await _repository.GetUser(userId);;

            if(!user.Photos.Any(p=> p.Id == id))
            return Unauthorized();

            var photoFromRepo=await _repository.GetPhoto(id);

            if(photoFromRepo.IsMain)
                return BadRequest("This is main photo already");

            var currentMainPhoto=await _repository.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain=false;
            photoFromRepo.IsMain=true;

            if(await _repository.SaveAll())
            return NoContent();

            return BadRequest("Can not set photo as main");
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeletePhoto(int userId, int id){

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user =await _repository.GetUser(userId);;

            if(!user.Photos.Any(p=> p.Id == id))
            return Unauthorized();

            var photoFromRepo=await _repository.GetPhoto(id);

            if(photoFromRepo.IsMain)
                return BadRequest("You can not delete main photo");

            var deleteParams=new DeletionParams(photoFromRepo.public_id);
            var result=_cloudinary.Destroy(deleteParams);

            if(result.Result=="ok")
                _repository.Delete(photoFromRepo);

            if(photoFromRepo.public_id==null)
                _repository.Delete(photoFromRepo);

            if(await _repository.SaveAll())
                return Ok();

            return BadRequest("Problem with deleting photo");



        }

}
}