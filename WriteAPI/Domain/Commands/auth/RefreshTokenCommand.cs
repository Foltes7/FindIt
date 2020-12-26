using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands.auth
{
    public class RefreshTokenCommand
    {
        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }
    }
}
