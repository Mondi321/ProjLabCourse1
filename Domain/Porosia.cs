using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Porosia
    {
        public Guid Id { get; set; }
        public string NumriPorosise { get; set; } = string.Empty;
        public string MetodaPageses { get; set; } = string.Empty;
        public decimal Totali { get; set; }
        public string AppUserId { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public ICollection<PorosiaDetail> PorosiaDetails { get; set; } = new List<PorosiaDetail>();
    }
}
