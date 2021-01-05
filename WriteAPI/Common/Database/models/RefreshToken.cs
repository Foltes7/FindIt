using Common.Database.helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Database.models
{
    public class RefreshToken : BaseEntity
    {
        public Guid UserId { set; get; }
        public User User { set; get; }

        public string TokenString { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}
