using Microsoft.AspNetCore.Mvc;
using Application.Stafis;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    [AllowAnonymous]
    public class StafiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetStafin()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStafi(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateStafi(Stafi stafi)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Stafi = stafi }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStafi(int id, Stafi stafi)
        {
            stafi.StafiId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Stafi = stafi }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStafi(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
