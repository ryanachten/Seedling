using System;

namespace api.Models.DTOs
{
    public class PlantForDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Species BiodiversityRecord { get; set; }
        public DateTime LastWatered { get; set; }
        public int WateringFrequency { get; set; }
        public WateringPeriod WateringPeriod { get; set; }
    }
}