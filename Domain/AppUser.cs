using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
        public ICollection<Rezervimi> Rezervimet { get; set; } = new List<Rezervimi>();
        public Photo? Photo { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<Porosia> Porosite { get; set; } = new List<Porosia>();
    }
}
