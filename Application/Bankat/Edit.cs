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

namespace Application.Bankat
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Banka Banka { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Banka).SetValidator(new BankaValidator());
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
                var banka = await this.context.Bankat.FindAsync(request.Banka.BankaId);

                if (banka == null) return null;

                this.mapper.Map(request.Banka, banka);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update banka");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
