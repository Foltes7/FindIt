using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace JWT
{
    public class RefreshToken
    {
        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("tokenString")]
        public string TokenString { get; set; }

        [JsonProperty("expireAt")]
        public DateTime ExpireAt { get; set; }
    }
}
