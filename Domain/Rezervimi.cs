using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Rezervimi
    {
        public Guid Id { get; set; }
        public DateTime Data { get; set; }
        public int NrPersonave { get; set; }
        public string Mesazhi { get; set; } = string.Empty;
        public string AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
    }
}
