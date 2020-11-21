using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace JWT
{
    public class JwtAuthResult
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("refreshToken")]
        public RefreshToken RefreshToken { get; set; }
    }
}
