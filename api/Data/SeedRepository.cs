using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Data
{
    public class SeedRepository : ISeedRepository
    {
        private readonly DataContext _context;

        public SeedRepository(DataContext context)
        {
            _context = context;
        }

        public ValueTask<EntityEntry<T>> Add<T>(T entity) where T : class
        {
            return _context.AddAsync(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Task<Plant> GetPlant(int id)
        {
            return _context.Plants.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id);
        }

        public Task<List<Plant>> GetPlants(int userId)
        {
            return _context.Plants.Where(p => p.User.Id == userId).ToListAsync();
        }

        public Task<User> GetUser(int id)
        {
            return _context.Users.Include(u => u.Plants).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}