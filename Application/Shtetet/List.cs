using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Shtetet
{
    public class List
    {
        public class Query : IRequest<Result<List<Shteti>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Shteti>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Shteti>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Shteti>>.Success(await this.context.Shtetet.Include(c => c.Qytetet).ToListAsync());
            }
        }
    }
}
