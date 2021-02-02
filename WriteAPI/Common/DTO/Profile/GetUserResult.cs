using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Profile
{
    public class GetUserResult
    {
        public UserDTO User { set; get; }
        public bool IsExist { set; get; }
    }
}
