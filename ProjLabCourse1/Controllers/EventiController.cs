﻿using Microsoft.AspNetCore.Mvc;
using Application.Eventet;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    [AllowAnonymous]
    public class EventiController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEventet()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEventi(Eventi eventi)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Eventi = eventi}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEventi(Guid id, Eventi eventi)
        {
            eventi.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Eventi = eventi}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventi(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
