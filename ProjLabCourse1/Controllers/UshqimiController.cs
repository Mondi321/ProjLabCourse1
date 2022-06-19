using Application.Ushqimet;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace ProjLabCourse1.Controllers
{
    public class UshqimiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetUshqimet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUshqimi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateUshqimi(Ushqimi ushqimi)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Ushqimi = ushqimi }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUshqimi(Guid id, Ushqimi ushqimi)
        {
            ushqimi.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Ushqimi = ushqimi }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUshqimi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
