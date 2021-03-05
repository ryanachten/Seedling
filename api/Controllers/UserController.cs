using System;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
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
        private readonly ISeedRepository _repo;
        private readonly IMapper _mapper;

        public UserController(ISeedRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _repo.GetUser(id);
            if (user.Id != Int32.Parse(userId))
                return Unauthorized();

            var userToReturn = _mapper.Map<UserForDetail>(user);

            return Ok(userToReturn);
        }
    }
}