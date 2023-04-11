using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FrogDate.API.Data;
using FrogDate.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrogDate.API.Controllers
{
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
        public async Task<IActionResult> GetUsers()
        {
            try
            {
            var users= await _repo.GetUsers();
            var usersToReturn= _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);   
            }
            catch(Exception e)
            {
            var x=e;
            }
            return BadRequest();
        }
        [HttpGet("{id}")]
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
    }
}