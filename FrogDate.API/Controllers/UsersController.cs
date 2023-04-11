using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrogDate.API.Data;
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
        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
            var users= await _repo.GetUsers();
            return Ok(users);   
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
            var user=await _repo.GetUser(id);
            return Ok(user);

        }
    }
}