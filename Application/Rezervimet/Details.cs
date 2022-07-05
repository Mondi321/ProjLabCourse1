using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rezervimet
{
    public class Details
    {
        public class Query : IRequest<Result<RezervimiDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<RezervimiDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<RezervimiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rezervimi = await this.context.Rezervimet
                    .ProjectTo<RezervimiDto>(this.mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<RezervimiDto>.Success(rezervimi);
            }
        }
    }
}
