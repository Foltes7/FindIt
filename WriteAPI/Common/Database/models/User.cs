

using Common.Database.helpers;

namespace Common.Database.models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhotoId { set; get; }
    }
}
