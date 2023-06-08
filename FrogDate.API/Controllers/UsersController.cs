using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FrogDate.API.Data;
using FrogDate.API.Dtos;
using FrogDate.API.Helpers;
using FrogDate.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrogDate.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class UsersController:ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value); 
            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "men" ? "women" : "men";
            }


            try
            {
            var users= await _repo.GetUsers(userParams);
            var usersToReturn= _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(usersToReturn);
            }
            catch(Exception e){
                var x=e;
            }
            return BadRequest();
        
        }
        [HttpGet("{id}",Name ="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user=await _repo.GetUser(id);
                var userToReturn = _mapper.Map<UserForDetailedDto>(user);
                return Ok(userToReturn);
            }
            catch(Exception e)
            {
                var x=e;
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            var x = User.FindFirst("tympyuju");

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo= await _repo.GetUser(id);
            var result = _mapper.Map(userForUpdateDto,userFromRepo);


            if (await _repo.Update(result))
            {
                return NoContent();
            }

            throw new Exception($"Updating user of id:{id} is failed");

        }

        [HttpPost("{id}/likes/{recipientId}")]

        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLikes(id,recipientId);

            if(like != null)
                return BadRequest("You already like this user");

            if(await _repo.GetUser(recipientId) == null)
                return NotFound();

            like = new Likes 
            {
                UserLikesId = id,
                UserIsLikedId = recipientId
            };

            _repo.Add<Likes>(like);

            if(await _repo.SaveAll())
                return Ok();
            
            return BadRequest("You can not like this user");

        }
       
    }
}