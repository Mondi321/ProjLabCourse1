using Microsoft.AspNetCore.Mvc;
using Application.Shtetet;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    [AllowAnonymous]
    public class ShtetiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetShtetet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetShteti(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateShteti(Shteti shteti)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Shteti = shteti}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShteti(int id, Shteti shteti)
        {
            shteti.ShtetiId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Shteti = shteti }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShteti(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id}));
        }
    }
}
