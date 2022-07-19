using Domain;

namespace ProjLabCourse1.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public ICollection<string> Roli { get; set; }
    }
}
