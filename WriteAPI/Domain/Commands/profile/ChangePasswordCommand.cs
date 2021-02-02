using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands.profile
{
    public class ChangePasswordCommand
    {
        public string OldPassword { set; get; }
        public string NewPassword { set; get; }
        public string ConfirmNewPassword { set; get; }
    }

    public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {
            RuleFor(x => x.OldPassword).Length(6, 20);
            RuleFor(x => x.NewPassword).Length(6, 20);
            RuleFor(x => x.ConfirmNewPassword).Equal(z => z.NewPassword);
        }
    }
}
