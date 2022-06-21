using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Stafi
    {
        public int StafiId { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Mbiemri { get; set; } = string.Empty;
        public string Detyra { get; set; } = string.Empty;
        public int ShtetiId { get; set; }
        public Shteti? Shteti { get; set; }
        public int QytetiId { get; set; }
        public Qyteti? Qyteti { get; set; }
        public int GjiniaId { get; set; }
        public Gjinia? Gjinia { get; set; }
        public int BankaId { get; set; }
        public Banka? Banka { get; set; }
        public string Adresa { get; set; } = string.Empty;
        public DateTime DataLindjes { get; set; }
    }
}
