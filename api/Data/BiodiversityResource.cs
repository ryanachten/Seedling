using System;
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

        public async Task<SearchResult> SearchSpecies(string term)
        {

            var request = new HttpRequestMessage(HttpMethod.Get, $"species/search?q={term}");
            var response = await _client.SendAsync(request);

            using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<SearchResult>(responseStream, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        public async Task<Species> GetSpeciesByKey(int key)
        {
            var request = new HttpRequestMessage(HttpMethod.Get, $"species/{key}");
            var response = await _client.SendAsync(request);

            using var responseStream = await response.Content.ReadAsStreamAsync();
            Console.WriteLine(responseStream);
            return await JsonSerializer.DeserializeAsync<Species>(responseStream, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }
    }
}