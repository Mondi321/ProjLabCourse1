using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Eventi
    {
        public Guid Id { get; set; }
        public string Titulli { get; set; } = string.Empty;
        public decimal Cmimi { get; set; }
        public string Pershkrimi { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
