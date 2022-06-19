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

namespace Application.Embelsirat
{
    public class List
    {
        public class Query : IRequest<Result<List<Embelsira>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Embelsira>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Embelsira>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Embelsira>>.Success(await this.context.Embelsirat.ToListAsync());
            }
        }
    }
}
