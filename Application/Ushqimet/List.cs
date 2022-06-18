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

namespace Application.Ushqimet
{
    public class List
    {
        public class Query : IRequest<Result<List<Ushqimi>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Ushqimi>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Ushqimi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Ushqimi>>.Success(await this.context.Ushqimet.ToListAsync());
            }
        }
    }
}
