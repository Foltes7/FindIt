using Newtonsoft.Json;

namespace Common.DTO.Auth
{
    public class LoginResult
    {
        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }
    }
}
