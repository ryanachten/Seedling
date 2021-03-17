using System;

namespace api.Models.DTOs
{
    public class PlantForCreate
    {
        public string Name { get; set; }
        public int BiodiversityResourceKey { get; set; }
        public int UserId { get; set; }
        public DateTime LastWatered { get; set; }
        public int WateringFrequency { get; set; }
        public WateringPeriod WateringPeriod { get; set; }
    }
}