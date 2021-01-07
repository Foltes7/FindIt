﻿using Microsoft.AspNetCore.Identity;
using System;

namespace Common.Database.models
{
    public class User : IdentityUser<Guid>
    {
        public string PhotoId { set; get; }
        public RefreshToken RefreshToken { set; get; }
        public bool isBussinessAcc { set; get; }
    }
}
