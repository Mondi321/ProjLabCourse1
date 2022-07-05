using Application.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rezervimet
{
    public class RezervimiDto
    {
        public Guid Id { get; set; }
        public DateTime Data { get; set; }
        public int NrPersonave { get; set; }
        public string Mesazhi { get; set; } = string.Empty;
        public string AppUserId { get; set; } = string.Empty;
        public Profile User { get; set; }
    }
}
