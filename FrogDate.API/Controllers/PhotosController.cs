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

        public async Task<IActionResult> AddPhotoForUser(int userId, PhotoForCreationDto photoForCreationDto)
        {
                        if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
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

            photoForCreationDto.Url=uploadResult.Uri.ToString();
            photoForCreationDto.PublicId=uploadResult.PublicId;

            var photo=_mapper.Map<Photo>(photoForCreationDto);

            if(userFromRepo.Photos.Any(p=>p.IsMain))
                photo.IsMain=true;

            userFromRepo.Photos.Add(photo);
            if(await _repository.SaveAll())
            {
                var photoToReturn=_mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto",new {id=photo.Id},photoToReturn);
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

}
}