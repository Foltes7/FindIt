using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Commands.profile
{
    public class SetBussinessAccountCommand : BaseCommandEntity, IRequest<Unit>
    {
    }
}
