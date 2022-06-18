using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ushqimet
{
    public class Details
    {
        public class Query : IRequest<Result<Ushqimi>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Ushqimi>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Ushqimi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ushqimi = await this.context.Ushqimet.FindAsync(request.Id);

                return Result<Ushqimi>.Success(ushqimi);
            }
        }
    }
}
