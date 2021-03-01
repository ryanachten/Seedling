using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using api.Models;

namespace api.Data
{
    public class BiodiversityResource : IBiodiversityResource
    {
        private readonly HttpClient _client;

        public BiodiversityResource(IHttpClientFactory clientFactory)
        {
            _client = clientFactory.CreateClient("gbif");
        }
        public async Task<SearchResult> Search(string term)
        {

            var request = new HttpRequestMessage(HttpMethod.Get, $"species/search?q={term}");
            var response = await _client.SendAsync(request);

            using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<SearchResult>(responseStream);
        }
    }
}