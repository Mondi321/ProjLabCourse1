using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Shteti
    {
        public int ShtetiId { get; set; }

        public string Emri { get; set; } = string.Empty;

        public string EmriPostal { get; set; } = string.Empty;
        public List<Qyteti> Qytetet { get; set; } = new List<Qyteti>();
    }
}
