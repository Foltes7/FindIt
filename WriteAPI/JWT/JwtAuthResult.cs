using Common.Database.models;
using Newtonsoft.Json;

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
