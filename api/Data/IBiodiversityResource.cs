using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public interface IBiodiversityResource
    {
        Task<SearchResult> Search(string term);
    }
}