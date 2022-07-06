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

namespace Application.Eventet
{
    public class List
    {
        public class Query : IRequest<Result<List<Eventi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Eventi>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Eventi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Eventi>>.Success(await this.context.Eventet.ToListAsync());
            }
        }
    }
}
