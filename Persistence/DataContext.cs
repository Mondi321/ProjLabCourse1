using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Ushqimi> Ushqimet { get; set; }
        public DbSet<Pije> Pijet { get; set; }
        public DbSet<Embelsira> Embelsirat { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Stafi> Stafis { get; set; }
        public DbSet<Shteti> Shtetet { get; set; }
        public DbSet<Qyteti> Qytetet { get; set; }
        public DbSet<Gjinia> Gjinite { get; set; }
        public DbSet<Banka> Bankat { get; set; }
        public DbSet<Rezervimi> Rezervimet { get; set; }
        public DbSet<Eventi> Eventet{ get; set; }
    }
}
