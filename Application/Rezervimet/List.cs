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
    public class List
    {
        public class Query : IRequest<Result<List<RezervimiDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RezervimiDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<RezervimiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var rezervimet = await this.context.Rezervimet
                    .ProjectTo<RezervimiDto>(this.mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<RezervimiDto>>.Success(rezervimet);
            }
        }
    }
}
