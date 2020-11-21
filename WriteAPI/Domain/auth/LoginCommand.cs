﻿using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Domain.auth
{
    public class LoginCommand
    {
        [Required]
        [JsonProperty("username")]
        public string UserName { get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
