using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; } = string.Empty; 
        public string? AppUserId { get; set; }
        [JsonIgnore]
        public AppUser? AppUser { get; set; }
    }
}
