using Microsoft.AspNetCore.Identity;
using System;

namespace Common.Database.models
{
    public class User : IdentityUser<Guid>
    {
        public string PhotoId { set; get; }
        public RefreshToken RefreshToken { set; get; }
        public bool isBussinessAcc { set; get; }
        public string Name { set; get; }
        public string Description { set; get; }
        public string Country { set; get; }
        public string WebSite { set; get; }
    }
}
