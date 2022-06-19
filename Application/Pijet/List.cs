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

namespace Application.Pijet
{
    public class List
    {
        public class Query : IRequest<Result<List<Pije>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Pije>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Pije>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Pije>>.Success(await this.context.Pijet.ToListAsync());
            }
        }
    }
}
