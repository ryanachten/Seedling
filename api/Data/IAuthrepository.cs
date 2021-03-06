using System.Threading.Tasks;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Data
{
    public interface IAuthrepository
    {
        Task<User> RegisterUser(User user, string password);
        Task<User> LoginUser(string email, string password);
        Task<bool> UserExists(string email);
        string CreateJwtToken(User user);
    }
}