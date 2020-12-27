using FluentValidation;


namespace Domain.Query.auth
{
    public class ValidateEmailQuery
    {
        public string Email { set; get; }
    }

    public class ValidateEmailQueryValidator : AbstractValidator<ValidateEmailQuery>
    {
        public ValidateEmailQueryValidator()
        {
            RuleFor(x => x.Email).Length(4, 100).EmailAddress();
        }
    }
}
