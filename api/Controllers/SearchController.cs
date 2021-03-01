using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IBiodiversityResource _bioResource;

        public SearchController(IBiodiversityResource bioResource)
        {
            _bioResource = bioResource;
        }

        [HttpGet()]
        public async Task<IActionResult> Search([FromQuery(Name = "q")] string term)
        {
            var results = await _bioResource.Search(term);
            return Ok(results);
        }
    }
}