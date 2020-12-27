using Common.Database.models;
using Common.DTO.Auth;
using Domain.Commands.auth;
using Domain.Query.auth;
using JWT;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WriteAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly UserManager<User> _userManager;
        public AuthController(IJwtAuthManager jwtAuthManager, UserManager<User> _userManager)
        {
            _jwtAuthManager = jwtAuthManager;
            this._userManager = _userManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginCommand request)
        {

            // TODO VALIDATE FROM DB

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, request.UserName),
            };
            var jwtResult = _jwtAuthManager.GenerateTokens(request.UserName, claims, DateTime.Now);

            return Ok(new LoginResult
            {
                UserName = request.UserName,
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("registration")]
        public async Task<IActionResult> Registration(RegistrationCommand command)
        {
            User user = new User { Email = command.Email, UserName = command.UserName };

            var result = await _userManager.CreateAsync(user, command.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            // optionally "revoke" JWT token on the server side --> add the current token to a block-list
            // https://github.com/auth0/node-jsonwebtoken/issues/375

            var userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            return Ok();
        }

        [HttpPost("refresh-token")]
        [Authorize]
        public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenCommand request)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrWhiteSpace(request.RefreshToken))
                {
                    return Unauthorized();
                }

                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");
                var jwtResult = _jwtAuthManager.Refresh(request.RefreshToken, accessToken, DateTime.Now);
                return Ok(new LoginResult
                {
                    UserName = userName,
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
            }
        }

        [AllowAnonymous]
        [HttpPost("validate/email")]
        public async Task<IActionResult> ValidateEmail(ValidateEmailQuery query)
        {
            var user = await this._userManager.FindByEmailAsync(query.Email);
            if(user != null)
            {
                return Ok(new { valid = true });
            }
            return Ok(new { valid = false });
        }

        [AllowAnonymous]
        [HttpPost("validate/username")]
        public async Task<IActionResult> ValidateUserName(ValidateUserNameQuery query)
        {
            var user = await this._userManager.FindByNameAsync(query.Username);
            if (user != null)
            {
                return Ok(new { valid = true });
            }
            return Ok(new { valid = false });
        }

    }
}
