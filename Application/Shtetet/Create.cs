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

namespace Application.Shtetet
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Shteti Shteti { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Shteti).SetValidator(new ShtetiValidator());
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
                this.context.Shtetet.Add(request.Shteti);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create shteti");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
