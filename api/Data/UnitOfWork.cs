using System.Net.Http;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IHttpClientFactory _client;

        public UnitOfWork(DataContext context, IHttpClientFactory clientFactory)
        {
            _context = context;
            _client = clientFactory;
        }
        public IAuthrepository AuthRepo => new AuthRepository(_context);

        public ISeedRepository SeedRepo => new SeedRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}