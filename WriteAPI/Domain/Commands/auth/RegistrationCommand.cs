using FluentValidation;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands.auth
{
    public class RegistrationCommand
    {
        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("confirmPassword")]
        public string ConfirmPassword { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }

    public class RegistrationCommandValidator : AbstractValidator<RegistrationCommand>
    {
        public RegistrationCommandValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().Length(4, 50);
            RuleFor(x => x.Password).Length(6, 20);
            RuleFor(x => x.ConfirmPassword).Equal(z => z.Password);
            RuleFor(x => x.Email).EmailAddress();
        }
    }
}
