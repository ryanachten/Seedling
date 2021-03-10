using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public Task<User> GetUser(int id)
        {
            return _context.Users.Include(u => u.Plants).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}