using FluentValidation;
using Newtonsoft.Json;

namespace Domain.Commands.auth
{
    public class RefreshTokenCommand
    {
        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }
    }

    public class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenCommandValidator()
        {
            RuleFor(x => x.RefreshToken).NotEmpty();
        }
    }
}
