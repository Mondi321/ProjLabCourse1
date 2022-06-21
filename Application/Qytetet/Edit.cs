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

namespace Application.Qytetet
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Qyteti Qyteti { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Qyteti).SetValidator(new QytetiValidator());
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
                var qyteti = await this.context.Qytetet.FindAsync(request.Qyteti.QytetiId);

                if (qyteti == null) return null;

                qyteti.Emri = request.Qyteti.Emri;
                qyteti.ShtetiId = request.Qyteti.ShtetiId;

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Qyteti");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
