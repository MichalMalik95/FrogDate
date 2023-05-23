using System;
using System.Collections.Generic;
using System.Data.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using FrogDate.API.Data;
using FrogDate.API.Dtos;
using FrogDate.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

namespace FrogDate.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repository,IConfiguration config, IMapper mapper)
        {
            _config = config;
            _repository = repository;
            _mapper = mapper;

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            try
            {
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

                if (await _repository.UserExist(userForRegisterDto.Username))
                {
                    return BadRequest("Użytkownik o takiej nazwie już istnieje");
                }

                var userToCreate = _mapper.Map<User>(userForRegisterDto);
                var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);
                var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

                return CreatedAtRoute("GetUser", new { controller = "Users", Id = createdUser.Id }, userToReturn);
            } catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.Username.ToLower(),userForLoginDto.Password);
            if(userFromRepo == null) return Unauthorized("Nimos dostępu chłopie");

            //creating Token
            var claims= new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username),
                new Claim("tympyuju" ,userFromRepo.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds =new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor=new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(claims),
                Expires= DateTime.Now.AddHours(12),
                SigningCredentials=creds
            };
            var tokenHandler =new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new {
                token=tokenHandler.WriteToken(token),
                user
            });

        }
    }
}