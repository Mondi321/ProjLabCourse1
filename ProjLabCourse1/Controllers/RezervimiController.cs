using Microsoft.AspNetCore.Mvc;
using Application.Rezervimet;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    public class RezervimiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRezervimet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRezervimi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRezervimi(Rezervimi rezervimi)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Rezervimi = rezervimi }));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> EditRezervimi(Guid id, Rezervimi rezervimi)
        {
            rezervimi.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Rezervimi = rezervimi}));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> DeleteRezervimi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
