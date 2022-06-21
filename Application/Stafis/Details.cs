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
    public class Details
    {
        public class Query : IRequest<Result<Stafi>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Stafi>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Stafi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var stafi = await this.context.Stafis
                    .Include(c => c.Shteti)
                    .Include(c => c.Qyteti)
                    .Include(q => q.Gjinia)
                    .Include(b => b.Banka).FirstOrDefaultAsync(x =>  x.StafiId == request.Id);

                return Result<Stafi>.Success(stafi);
            }
        }
    }
}
