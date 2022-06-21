using Application.Core;
using AutoMapper;
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
    public class Edit
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
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var shteti = await this.context.Shtetet.FindAsync(request.Shteti.ShtetiId);

                if (shteti == null) return null;

                this.mapper.Map(request.Shteti, shteti);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update shteti");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
