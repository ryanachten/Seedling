using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using api.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AuthController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegister userToRegister)
        {
            userToRegister.Email = userToRegister.Email.ToLower();
            if (await _unitOfWork.AuthRepo.UserExists(userToRegister.Email))
                return BadRequest("Email already registered");

            var user = _mapper.Map<User>(userToRegister);

            var createdUser = await _unitOfWork.AuthRepo.RegisterUser(user, userToRegister.Password);

            var userToReturn = _mapper.Map<UserForDetail>(user);

            return Ok(userToRegister);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin userToLogin)
        {
            var user = await _unitOfWork.AuthRepo.LoginUser(userToLogin.Email.ToLower(), userToLogin.Password);
            if (user == null)
                return Unauthorized();

            var token = _unitOfWork.AuthRepo.CreateJwtToken(user);

            var userToReturn = _mapper.Map<UserForDetail>(user);

            return Ok(new
            {
                user = userToReturn,
                token
            });
        }
    }
}