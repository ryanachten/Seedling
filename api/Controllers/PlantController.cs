using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Interfaces;
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
        private readonly IBiodiversityResource _bioResource;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PlantController(IUnitOfWork unitOfWork, IBiodiversityResource bioResource, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _bioResource = bioResource;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlants()
        {
            // string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // var plants = await _unitOfWork.PlantRepo.GetPlants(Int32.Parse(userId));
            // var plantsToReturn = _mapper.Map<List<PlantForList>>(plants);
            // return Ok(plantsToReturn);
            return Ok("hello");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlantById(int id)
        {
            var plant = await _unitOfWork.PlantRepo.GetPlant(id);
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Int32.Parse(userId) != plant.User.Id)
                return Unauthorized();

            var species = await _bioResource.GetSpeciesByKey(plant.BiodiversityResourceKey);

            var plantToReturn = _mapper.Map<PlantForDetail>(plant);
            plantToReturn.BiodiversityRecord = species;

            return Ok(plantToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePlant(PlantForCreate plantToCreate)
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (Int32.Parse(userId) != plantToCreate.UserId)
                return Unauthorized();

            var user = await _unitOfWork.UserRepo.GetUser(plantToCreate.UserId);
            if (user == null)
                return Unauthorized();

            var plant = _mapper.Map<Plant>(plantToCreate);
            plant.User = user;
            await _unitOfWork.PlantRepo.AddPlant(plant);
            await _unitOfWork.Complete();

            var species = await _bioResource.GetSpeciesByKey(plant.BiodiversityResourceKey);
            var plantToReturn = _mapper.Map<PlantForDetail>(plant);
            plantToReturn.BiodiversityRecord = species;
            return Ok(plantToReturn);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemovePlant(int id)
        {
            Plant plant = await _unitOfWork.PlantRepo.GetPlant(id);
            _unitOfWork.PlantRepo.DeletePlant(plant);
            await _unitOfWork.Complete();
            return Ok(plant);
        }
    }
}