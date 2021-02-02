using Common.DTO.Profile;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Query.profile
{
    public class GetUserProfileQuery: BaseEntity, IRequest<GetUserResult>
    {
        public string GetByUsername { set; get; }
    }
}
