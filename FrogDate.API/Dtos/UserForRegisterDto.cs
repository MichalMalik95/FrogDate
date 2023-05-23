using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FrogDate.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Username is obligatory")]

        public string? Username { get; set; }
        [Required(ErrorMessage = "Password is obligatory")]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "Password must have min 6 and max 12 symbols")]
        public string? Password { get; set; }
        [Required]
        public string? Gender { get; set; }
        [Required]
        public DateTime DayOfBirth { get; set; }
        [Required]
        public string? ZodiacSign { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Country { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }

    }
}