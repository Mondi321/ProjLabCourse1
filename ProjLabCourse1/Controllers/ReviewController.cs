using Microsoft.AspNetCore.Mvc;
using Application.Reviews;
using Domain;
using Microsoft.AspNetCore.Authorization;

namespace ProjLabCourse1.Controllers
{
    public class ReviewController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReview(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateReview(Review review)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Review = review}));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> EditReview(Guid id, Review review)
        {
            review.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Review = review}));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = CustomRoles.Admin)]
        public async Task<IActionResult> DeleteReview(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
