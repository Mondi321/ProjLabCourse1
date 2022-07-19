using Application.Contacts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ProjLabCourse1.Controllers
{
    public class ContactController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact(Contact contact)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Contact = contact}));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> EditContact(Guid id, Contact contact)
        {
            contact.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Contact = contact}));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
