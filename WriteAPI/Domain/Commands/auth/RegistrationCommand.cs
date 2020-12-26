using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands.auth
{
    public class RegistrationCommand
    {
        [Required]
        [JsonProperty("username")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }

        [Required]
        [JsonProperty("password_confirm")]
        public string ConfirmPassword { get; set; }

        [Required]
        [JsonProperty("email")]
        public string Email { get; set; }
    }
}
