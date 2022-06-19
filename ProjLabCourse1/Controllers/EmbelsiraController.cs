using Application.Embelsirat;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    public class EmbelsiraController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEmbelsirat()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmbelsira(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmbelsira(Embelsira embelsira)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Embelsira = embelsira }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmbelsira(Guid id, Embelsira embelsira)
        {
            embelsira.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Embelsira = embelsira }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmbelsira(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
    
}
