using System.Security.Claims;
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
    [Route("api/users/{userId}/[controller]")] 
    
    public class MessagesController : ControllerBase
    {
        public IUserRepository _repository { get; }
        public IMapper _mapper { get; }

        public MessagesController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetMessage")]

        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized(); 
            
            var messageFromRepo = await _repository.GetMessage(id);

            if (messageFromRepo ==null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet]

        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized(); 

            messageParams.UserId = userId;
            var messagesFromRepo = await _repository.GetMessageForUser(messageParams);
            var messagesToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize,
                                     messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);
            
            return Ok(messagesToReturn);

        }

        [HttpPost]

        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized(); 

            messageForCreationDto.SenderId = userId;

            var recipient = await _repository.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest("Can't find recipient :(");

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repository.Add(message);

            var messageToReturn = _mapper.Map<MessageForCreationDto>(message);

            if(await _repository.SaveAll())
                return CreatedAtRoute("GetMessage", new {id = message.Id}, messageToReturn);

            throw new Exception("Create message is not completed due save error");
        }



    }
}