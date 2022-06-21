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

namespace Application.Gjinite
{
    public class List
    {
        public class Query : IRequest<Result<List<Gjinia>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Gjinia>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Gjinia>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Gjinia>>.Success(await this.context.Gjinite.ToListAsync());
            }
        }
    }
}
