using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Interfaces
{
    public interface ISeedRepository
    {
        ValueTask<EntityEntry<T>> Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<List<Plant>> GetPlants(int userId);
        Task<Plant> GetPlant(int id);
        Task<User> GetUser(int id);
    }
}