using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IAuthrepository AuthRepo { get; }
        ISeedRepository SeedRepo { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}