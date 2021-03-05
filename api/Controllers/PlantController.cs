using System;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Models.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PlantController : ControllerBase
    {
        private readonly ISeedRepository _repo;
        private readonly IBiodiversityResource _bioResource;
        private readonly IMapper _mapper;

        public PlantController(ISeedRepository repo, IBiodiversityResource bioResource, IMapper mapper)
        {
            _repo = repo;
            _bioResource = bioResource;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlants()
        {
            var plants = await _repo.GetPlants();
            return Ok(plants);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlantById(int id)
        {
            var plant = await _repo.GetPlant(id);
            var species = await _bioResource.GetSpeciesByKey(plant.BiodiversityResourceKey);

            var plantToReturn = _mapper.Map<PlantForDetail>(plant);
            plantToReturn.BiodiversityRecord = species;

            return Ok(plantToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlant([FromForm] PlantForCreate plantToCreate)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Int32.Parse(userId) != plantToCreate.UserId)
                return Unauthorized();

            var user = await _repo.GetUser(plantToCreate.UserId);
            if (user == null)
                return Unauthorized();

            var plant = _mapper.Map<Plant>(plantToCreate);
            plant.User = user;
            await _repo.Add(plant);
            await _repo.SaveAll();

            var species = await _bioResource.GetSpeciesByKey(plant.BiodiversityResourceKey);
            var plantToReturn = _mapper.Map<PlantForDetail>(plant);
            plantToReturn.BiodiversityRecord = species;
            return Ok(plantToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemovePlant(int id)
        {
            Plant plant = await _repo.GetPlant(id);
            _repo.Delete(plant);
            await _repo.SaveAll();
            return Ok(plant);
        }
    }
}