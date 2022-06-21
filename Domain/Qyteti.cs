using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain
{
    public class Qyteti
    {
        public int QytetiId { get; set; }
        public string Emri { get; set; } = string.Empty;
        public int ShtetiId { get; set; }
        [JsonIgnore]
        public Shteti? Shteti { get; set; }
    }
}
