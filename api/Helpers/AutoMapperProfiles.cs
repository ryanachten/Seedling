using api.Models;
using api.Models.DTOs;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<PlantForCreate, Plant>();
            CreateMap<Plant, PlantForList>();
            CreateMap<Plant, PlantForDetail>();
            CreateMap<UserForRegister, User>();
            CreateMap<User, UserForDetail>();
        }
    }
}