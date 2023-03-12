using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$", ErrorMessage ="Password must contain at least 8 characters: 1 uppercase, 1 lowercase, 1 number and 1 special character like:  @ $ ! % * # ? &)")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

    }
}