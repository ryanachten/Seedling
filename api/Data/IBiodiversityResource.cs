using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IBiodiversityResource
    {
        Task<SearchResult> SearchSpecies(string term);
        Task<Species> GetSpeciesByKey(int key);
    }
}