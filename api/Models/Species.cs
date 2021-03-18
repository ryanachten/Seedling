using System.Collections.Generic;

namespace api.Models
{
    public class Species
    {
        public int Key { get; set; }
        public string Kingdom { get; set; }
        public string Phylum { get; set; }
        public string Order { get; set; }
        public string Family { get; set; }
        public string Genus { get; set; }
        public string ScientificName { get; set; }
        public string CanonicalName { get; set; }
        public string Authorship { get; set; }
        public bool Synonym { get; set; }
        public List<SpeciesMedia> Media { get; set; }
    }
}