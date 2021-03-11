using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IAuthrepository AuthRepo { get; }
        IUserRepository UserRepo { get; }
        IPlantRepository PlantRepo { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}