using Application.Qytetet;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    public class QytetiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetQytetet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetQyteti(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateQyteti(Qyteti qyteti)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Qyteti = qyteti}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQyteti(int id, Qyteti qyteti)
        {
            qyteti.QytetiId = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Qyteti = qyteti }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQyteti(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
