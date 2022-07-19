using Microsoft.AspNetCore.Mvc;
using Application.Porosite;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    public class PorosiaController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPorosite()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPorosia(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePorosia(Porosia porosia)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Porosia = porosia}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPorosia(Guid id, Porosia porosia)
        {
            porosia.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Porosia = porosia }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePorosia(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
