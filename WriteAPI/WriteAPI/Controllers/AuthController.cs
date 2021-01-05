using Common.Database.models;
using Common.DTO.Auth;
using Context.GenericRepository;
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
        private readonly SignInManager<User> _signInManager;
        public AuthController(
            IJwtAuthManager jwtAuthManager, 
            UserManager<User> _userManager,
            SignInManager<User> _signInManager
            )
        {
            _jwtAuthManager = jwtAuthManager;
            this._userManager = _userManager;
            this._signInManager = _signInManager;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<LoginResult>> Login([FromBody] LoginCommand request)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if(user != null)
            {
                var check = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (check.Succeeded)
                {
                    var claims = new[] { new Claim(ClaimTypes.Name, request.UserName) };
                    var jwtResult = await _jwtAuthManager.GenerateTokens(user.Id, claims, DateTime.Now);

                    return Ok(new LoginResult
                    {
                        Success = true,
                        UserName = request.UserName,
                        AccessToken = jwtResult.AccessToken,
                        RefreshToken = jwtResult.RefreshToken.TokenString
                    });
                }
            }
            return Ok(new LoginResult
            {
                Success = false,
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
        public async Task<ActionResult> Logout()
        {
            var userName = User.Identity.Name;
            var user = await _userManager.FindByNameAsync(userName);
            await _jwtAuthManager.RemoveRefreshTokenByUserName(user.Id);
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
                var jwtResult = await _jwtAuthManager.Refresh(request.RefreshToken, accessToken);
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
            if (user == null)
            {
                return Ok(new { valid = true });
            }
            return Ok(new { valid = false });
        }

    }
}
