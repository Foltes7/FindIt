using FluentValidation;

namespace Domain.Query.auth
{
    public class ValidateUserNameQuery
    {
        public string Username { set; get; }
    }

    public class ValidateUserNameQueryValidator : AbstractValidator<ValidateUserNameQuery>
    {
        public ValidateUserNameQueryValidator()
        {
            RuleFor(x => x.Username).Length(3, 100);
        }
    }
}
