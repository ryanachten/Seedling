using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUser(int id);
    }
}