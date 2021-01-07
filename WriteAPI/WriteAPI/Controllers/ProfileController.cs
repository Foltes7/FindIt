using BI.Services.profile;
using Common.DTO.Profile;
using Domain.Commands.profile;
using Domain.Query.profile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WriteAPI.Configuration;

namespace WriteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProfileController(IMediator _mediator)
        {
            this._mediator = _mediator;
        }

        [HttpPatch("account/bussiness")]
        public async Task SetBussinessAccount(SetBussinessAccountCommand command)
        {
            this.SetRequestClaims(command);
            await this._mediator.Send(command);
        }

        [HttpPatch("account/default")]
        public async Task SetDefaultAccount(SetDefaultAccountCommand command)
        {
            this.SetRequestClaims(command);
            await this._mediator.Send(command);
        }

        [HttpGet("{username}")]
        public async Task<UserDTO> GetProfileById(string username)
        {
            var query = new GetUserProfileQuery();
            this.SetRequestClaims(query);
            query.GetByUsername = username;
            return await this._mediator.Send(query);
        }
    }
}
