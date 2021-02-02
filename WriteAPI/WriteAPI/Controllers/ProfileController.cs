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

        [HttpGet("account/bussiness")]
        public async Task SetBussinessAccount()
        {
            var command = new SetBussinessAccountCommand();
            this.SetRequestClaims(command);
            await this._mediator.Send(command);
        }

        [HttpGet("account/default")]
        public async Task SetDefaultAccount()
        {
            var command = new SetDefaultAccountCommand();
            this.SetRequestClaims(command);
            await this._mediator.Send(command);
        }

        [HttpGet("{username}")]
        public async Task<GetUserResult> GetProfileById(string username)
        {
            var query = new GetUserProfileQuery();
            this.SetRequestClaims(query);
            query.GetByUsername = username;
            return await this._mediator.Send(query);
        }
    }
}
