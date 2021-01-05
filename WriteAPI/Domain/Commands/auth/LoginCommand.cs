using FluentValidation;
using Newtonsoft.Json;

namespace Domain.Commands.auth
{
    public class LoginCommand
    {
        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }

    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().Length(4,50);
            RuleFor(x => x.Password).Length(6, 20);
        }
    }
}
