using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Profile
{
    public class UserDTO
    {
        public string PhotoId { set; get; }
        public bool isBussinessAcc { set; get; }
        public string Name { set; get; }
        public string UserName { get; set; }
        public string Description { set; get; }
        public string Country { set; get; }
        public string WebSite { set; get; }
    }
}
