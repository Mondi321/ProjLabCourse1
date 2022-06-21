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

namespace Application.Bankat
{
    public class List
    {
        public class Query : IRequest<Result<List<Banka>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Banka>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Banka>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Banka>>.Success(await this.context.Bankat.ToListAsync());
            }
        }
    }
}
