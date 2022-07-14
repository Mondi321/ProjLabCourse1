using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Reviews
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Review Review { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Review).SetValidator(new ReviewValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var review = await this.context.Reviews.FindAsync(request.Review.Id);

                if (review == null) return null;

                review.Mesazhi = request.Review.Mesazhi;
                review.RatingValue = request.Review.RatingValue;
                review.AppUserId = review.AppUserId;

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update review");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
