using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WriteAPI.Configuration
{

    public static class HttpContextHelper
    {
        public static void SetRequestClaims<T>(this ControllerBase controller, T command) where T : BaseEntity
        {
            var email = controller.User.Claims.FirstOrDefault(x => x.Type.Contains("emailaddress"))?.Value;
            var username = controller.User.Identity.Name;
            command.Email = email;
            command.UserName = username;
        }
    }
}
