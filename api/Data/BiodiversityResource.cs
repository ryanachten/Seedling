using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using api.Interfaces;
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
            var speciesRequest = new HttpRequestMessage(HttpMethod.Get, $"species/{key}");
            var mediaRequest = new HttpRequestMessage(HttpMethod.Get, $"species/{key}/media");

            var speciesResponse = await _client.SendAsync(speciesRequest);
            var mediaResponse = await _client.SendAsync(mediaRequest);

            using var speciesStream = await speciesResponse.Content.ReadAsStreamAsync();
            using var mediaStream = await mediaResponse.Content.ReadAsStreamAsync();

            var jsonOpts = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var species = await JsonSerializer.DeserializeAsync<Species>(speciesStream, jsonOpts);
            var mediaResults = await JsonSerializer.DeserializeAsync<SearchMediaResult>(mediaStream, jsonOpts);
            species.Media = mediaResults.Results;

            return species;
        }
    }
}