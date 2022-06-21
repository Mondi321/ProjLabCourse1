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

namespace Application.Gjinite
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Gjinia Gjinia { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Gjinia).SetValidator(new GjiniaValidator());
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
                var gjinia =  await this.context.Gjinite.FindAsync(request.Gjinia.GjiniaId);

                if (gjinia == null) return null;

                this.mapper.Map(request.Gjinia, gjinia);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update gjinia");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
