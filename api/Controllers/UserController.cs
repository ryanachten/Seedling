using System;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.UserRepo.GetUser(id);
            if (user.Id != Int32.Parse(userId))
                return Unauthorized();

            var userToReturn = _mapper.Map<UserForDetail>(user);

            return Ok(userToReturn);
        }
    }
}