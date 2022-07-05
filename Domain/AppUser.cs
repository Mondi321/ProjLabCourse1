using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
        public ICollection<Rezervimi> Rezervimet { get; set; } = new List<Rezervimi>();
    }
}
