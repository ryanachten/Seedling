using System.Collections.Generic;

namespace api.Models.DTOs
{
    public class UserForDetail
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<PlantForList> Plants { get; set; }
    }
}