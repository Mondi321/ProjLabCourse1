using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Bankat
{
    public class Details
    {
        public class Query : IRequest<Result<Banka>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Banka>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Banka>> Handle(Query request, CancellationToken cancellationToken)
            {
                var banka = await this.context.Bankat.FindAsync(request.Id);

                return Result<Banka>.Success(banka);
            }
        }
    }
}
