using Common.Database.models;
using Context.GenericRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JWT
{
    public interface IJwtAuthManager
    {
        Task<JwtAuthResult> GenerateTokens(Guid userId, Claim[] claims, DateTime now);
        Task<JwtAuthResult> Refresh(string refreshToken, string accessToken);
        Task RemoveExpiredRefreshTokens(DateTime now);
        Task RemoveRefreshTokenByUserName(Guid userId);
        (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token);
    }
    public class JwtAuthManager : IJwtAuthManager
    {    
        private readonly JwtTokenConfig _jwtTokenConfig;
        private readonly byte[] _secret;
        private readonly IRepository<RefreshToken> _refreshTokenRepostory;
        private readonly UserManager<User> _userManager;

        public JwtAuthManager(
            JwtTokenConfig jwtTokenConfig,
            IRepository<RefreshToken> refreshTokenRepostory,
            UserManager<User> _userManager
            )
        {
            _jwtTokenConfig = jwtTokenConfig;
            _secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret);
            _refreshTokenRepostory = refreshTokenRepostory;
            this._userManager = _userManager;
        }

        // optional: clean up expired refresh tokens
        public async Task RemoveExpiredRefreshTokens(DateTime now)
        {
            var expiredTokens = await _refreshTokenRepostory.GetWhere(x => x.ExpireAt < now);
            foreach (var expiredToken in expiredTokens)
            {
                await _refreshTokenRepostory.Remove(expiredToken);
            }
        }

        // can be more specific to ip, user agent, device name, etc.
        public async Task RemoveRefreshTokenByUserName(Guid userId)
        {
            var refreshToken = await _refreshTokenRepostory.FirstOrDefault(z => z.UserId == userId);
            if(refreshToken != null)
            {
                await _refreshTokenRepostory.Remove(refreshToken);
            }
        }

        public async Task<JwtAuthResult> GenerateTokens(Guid userId, Claim[] claims, DateTime now)
        {
            var shouldAddAudienceClaim = string.IsNullOrWhiteSpace(claims?.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Aud)?.Value);
            var jwtToken = new JwtSecurityToken(
               issuer: _jwtTokenConfig.Issuer,
               audience: shouldAddAudienceClaim ? _jwtTokenConfig.Audience : string.Empty,
               claims: claims,
               expires: now.AddMinutes(_jwtTokenConfig.AccessTokenExpiration),
               signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha256Signature));
            var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            var refreshToken = new RefreshToken
            {
                UserId = userId,
                TokenString = GenerateRefreshTokenString(),
                ExpireAt = now.AddMinutes(_jwtTokenConfig.RefreshTokenExpiration)
            };
            await _refreshTokenRepostory.Add(refreshToken);

            return new JwtAuthResult
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<JwtAuthResult> Refresh(string refreshToken, string accessToken)
        {
            var currentDateTime = DateTime.Now;
            var (principal, jwtToken) = DecodeJwtToken(accessToken);
            if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256Signature))
            {
                throw new SecurityTokenException("Invalid token");
            }

            var userName = principal.Identity.Name;
            var user = await _userManager.FindByNameAsync(userName);
            if(user == null)
            {
                throw new SecurityTokenException("Invalid user name");
            }

            var existingRefreshToken = await _refreshTokenRepostory.FirstOrDefault(z => z.TokenString == refreshToken && z.UserId == user.Id);

            if (existingRefreshToken == null)
            {
                throw new SecurityTokenException("Invalid token");
            }
            if (existingRefreshToken.ExpireAt < currentDateTime)
            {
                throw new SecurityTokenException("Invalid token");
            }

            return await GenerateTokens(user.Id, principal.Claims.ToArray(), currentDateTime); // need to recover the original claims
        }

        public (ClaimsPrincipal, JwtSecurityToken) DecodeJwtToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                throw new SecurityTokenException("Invalid token");
            }
            var principal = new JwtSecurityTokenHandler()
                .ValidateToken(token,
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = _jwtTokenConfig.Issuer,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(_secret),
                        ValidAudience = _jwtTokenConfig.Audience,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(1)
                    },
                    out var validatedToken);
            return (principal, validatedToken as JwtSecurityToken);
        }

        private static string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
