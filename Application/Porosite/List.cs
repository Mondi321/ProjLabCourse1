using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Porosite
{
    public class List
    {
        public class Query : IRequest<Result<List<PorosiaDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PorosiaDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<PorosiaDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var porosite = await this.context.Porosite
                    .ProjectTo<PorosiaDto>(this.mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<PorosiaDto>>.Success(porosite);
            }
        }
    }
}
