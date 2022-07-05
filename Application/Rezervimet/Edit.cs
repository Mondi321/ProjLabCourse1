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

namespace Application.Rezervimet
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Rezervimi Rezervimi { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Rezervimi).SetValidator(new RezervimiValidator());
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
                var rezervimi = await this.context.Rezervimet.FindAsync(request.Rezervimi.Id);

                if (rezervimi == null) return null;

                rezervimi.Id = request.Rezervimi.Id;
                rezervimi.Data = request.Rezervimi.Data;
                rezervimi.NrPersonave = request.Rezervimi.NrPersonave;
                rezervimi.Mesazhi = request.Rezervimi.Mesazhi;
                rezervimi.AppUserId = rezervimi.AppUserId;

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update rezervimi");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
