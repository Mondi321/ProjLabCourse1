using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class PorosiaDetail
    {
        public Guid Id { get; set; }
        public Guid? UshqimiId { get; set; } 
        public Ushqimi? Ushqimi { get; set; }
        public Guid? PijeId { get; set; } 
        public Pije? Pije{ get; set; }
        public Guid? EmbelsiraId { get; set; } 
        public Embelsira? Embelsira { get; set; }
        public Guid PorosiaId { get; set; }
        public Porosia? Porosia { get; set; }
        public decimal CmimiArtikullit { get; set; }
        public int Sasia { get; set; }
    }
}
