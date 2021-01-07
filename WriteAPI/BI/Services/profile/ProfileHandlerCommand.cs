using Common.Database.models;
using Domain.Commands.profile;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BI.Services.profile
{
    public class ProfileHandlerCommand :
        IRequestHandler<SetBussinessAccountCommand, Unit>,
        IRequestHandler<SetDefaultAccountCommand, Unit>
    {
        private readonly UserManager<User> _userManager;
        public ProfileHandlerCommand(UserManager<User> _userManager)
        {
            this._userManager = _userManager;
        }

        public async Task<Unit> Handle(SetBussinessAccountCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.isBussinessAcc = true;
            await _userManager.UpdateAsync(user);
            return Unit.Value;
        }

        public async Task<Unit> Handle(SetDefaultAccountCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if(user == null)
            {
                throw new Exception("User not found");
            }
            user.isBussinessAcc = false;
            await _userManager.UpdateAsync(user);
            return Unit.Value;
        }
    }
}
