using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantController : ControllerBase
    {
        private readonly ISeedRepository _repo;
        private readonly IBiodiversityResource _bioResource;

        public PlantController(ISeedRepository repo, IBiodiversityResource bioResource)
        {
            _repo = repo;
            _bioResource = bioResource;
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
            var plantToReturn = new PlantForDetail
            {
                Id = plant.Id,
                Name = plant.Name,
                BiodiversityRecord = species,
            };
            return Ok(plantToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlant([FromForm] PlantForCreate plantToCreate)
        {
            var plant = new Plant { Name = plantToCreate.Name };
            await _repo.Add(plant);
            await _repo.SaveAll();
            return Ok(plant);
        }
    }
}