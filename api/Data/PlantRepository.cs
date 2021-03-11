using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class PlantRepository : IPlantRepository
    {
        private readonly DataContext _context;

        public PlantRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddPlant(Plant plant)
        {
            await _context.Plants.AddAsync(plant);
        }

        public void DeletePlant(Plant plant)
        {
            _context.Plants.Remove(plant);
        }

        public Task<Plant> GetPlant(int id)
        {
            return _context.Plants.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id);
        }

        public Task<List<Plant>> GetPlants(int userId)
        {
            return _context.Plants.Where(p => p.User.Id == userId).ToListAsync();
        }
    }
}