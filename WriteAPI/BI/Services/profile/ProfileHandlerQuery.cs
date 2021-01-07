using AutoMapper;
using Common.Database.models;
using Common.DTO.Profile;
using Domain.Query.profile;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BI.Services.profile
{
    public class ProfileHandlerQuery :
         IRequestHandler<GetUserProfileQuery, UserDTO>
    {
        private readonly IMapper mapper;
        private readonly UserManager<User> _userManager;
        public ProfileHandlerQuery(UserManager<User> _userManager, IMapper mapper)
        {
            this._userManager = _userManager;
            this.mapper = mapper;
        }

        public async Task<UserDTO> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(request.GetByUsername);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            var userDTO = mapper.Map<UserDTO>(user);
            if(user.UserName == request.UserName && user.Email == request.Email)
            {
                userDTO.OwnProfile = true;
            }
            return userDTO;
        }
    }
}
