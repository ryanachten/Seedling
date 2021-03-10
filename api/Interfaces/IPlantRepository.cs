using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IPlantRepository
    {
        Task<Plant> GetPlant(int id);
        Task<List<Plant>> GetPlants(int userId);
        Task AddPlant(Plant plant);
        void DeletePlant(Plant plant);
    }
}