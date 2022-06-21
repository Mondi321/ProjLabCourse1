using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stafis
{
    public class List
    {
        public class Query : IRequest<Result<List<Stafi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Stafi>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<Stafi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var stafi = await this.context.Stafis
                    .Include(c => c.Shteti)
                    .Include(c => c.Qyteti)
                    .Include(q => q.Gjinia)
                    .Include(b => b.Banka).ToListAsync();


                return Result<List<Stafi>>.Success(stafi);
            }
        }
    }
}
