using Application.Pijet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    public class PijeController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPijet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPije(Guid id )
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePije(Pije pije)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Pije = pije}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPije(Guid id, Pije pije)
        {
            pije.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Pije = pije}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePije(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id}));
        }
    }
    
}
