using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public long Numri { get; set; }
        public string Mesazhi { get; set; } = string.Empty;
    }
}
