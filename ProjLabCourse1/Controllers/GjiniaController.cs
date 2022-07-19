using Application.Gjinite;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    public class GjiniaController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetGjinite()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGjinia(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id}));
        }

        [HttpPost]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> CreateGjinia(Gjinia gjinia)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Gjinia = gjinia}));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> EditGjinia(int id, Gjinia gjinia)
        {
            gjinia.GjiniaId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Gjinia = gjinia}));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> DeleteGjinia(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id}));
        }
    }
}
