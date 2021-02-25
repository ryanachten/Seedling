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

        public PlantController(ISeedRepository repo)
        {
            _repo = repo;
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
            return Ok(plant);
        }

        [HttpPost]
        public IActionResult CreatePlant([FromForm] PlantForCreate plantToCreate)
        {
            var plant = new Plant { Name = plantToCreate.Name };
            _repo.Add(plant);
            _repo.SaveAll();
            return Ok(plant);
        }
    }
}