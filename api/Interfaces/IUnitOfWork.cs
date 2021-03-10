using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IAuthrepository Authrepository { get; }
        IBiodiversityResource BiodiversityResource { get; }
        ISeedRepository SeedRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}