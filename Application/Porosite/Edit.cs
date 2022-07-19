using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Porosite
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Porosia Porosia{ get; set; }
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
                var porosia = await this.context.Porosite.FindAsync(request.Porosia.Id);

                if (porosia == null) return null;

                porosia.Id = request.Porosia.Id;
                porosia.NumriPorosise = porosia.NumriPorosise;
                porosia.MetodaPageses = request.Porosia.MetodaPageses;
                porosia.Totali = request.Porosia.Totali;
                porosia.AppUserId = porosia.AppUserId;
                porosia.PorosiaDetails = request.Porosia.PorosiaDetails;

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update porosia");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
