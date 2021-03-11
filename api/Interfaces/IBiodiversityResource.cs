using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IBiodiversityResource
    {
        Task<SearchResult> SearchSpecies(string term);
        Task<Species> GetSpeciesByKey(int key);
    }
}