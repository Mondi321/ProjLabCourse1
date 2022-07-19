using Application.Bankat;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    [AllowAnonymous]
    public class BankaController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBankat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBanka(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateBanka(Banka banka)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Banka = banka}));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditBanka(int id, Banka banka)
        {
            banka.BankaId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Banka = banka}));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBanka(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
