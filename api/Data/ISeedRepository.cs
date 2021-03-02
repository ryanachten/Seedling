using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace api.Data
{
    public interface ISeedRepository
    {
        ValueTask<EntityEntry<T>> Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<Plant>> GetPlants();
        Task<Plant> GetPlant(int id);
    }
}