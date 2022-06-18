using System.ComponentModel.DataAnnotations;

namespace ProjLabCourse1.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Passwordi duhet te kete nje shkoronje te madhe, nje shkronje te vogel dhe nje numer")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
