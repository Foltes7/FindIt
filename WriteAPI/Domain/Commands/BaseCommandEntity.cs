using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands
{
    public class BaseCommandEntity
    {
        public string Email { set; get; }
        public string UserName { set; get; }
    }
}
