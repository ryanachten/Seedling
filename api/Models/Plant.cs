using System;

namespace api.Models
{
    public enum WateringPeriod
    {
        days,
        weeks,
        months
    }

    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BiodiversityResourceKey { get; set; }
        public User User { get; set; }
        public DateTime LastWatered { get; set; }
        public int WateringFrequency { get; set; }
        public WateringPeriod WateringPriod { get; set; }

    }
}