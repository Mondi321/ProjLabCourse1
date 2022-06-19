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

namespace Application.Embelsirat
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Embelsira Embelsira { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Embelsira).SetValidator(new EmbelsiraValidator());
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
                var embelsira = await this.context.Embelsirat.FindAsync(request.Embelsira.Id);

                if (embelsira == null) return null;

                this.mapper.Map(request.Embelsira, embelsira);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update embelsira");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
