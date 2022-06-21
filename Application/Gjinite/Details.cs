using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gjinite
{
    public class Details
    {
        public class Query : IRequest<Result<Gjinia>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Gjinia>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Gjinia>> Handle(Query request, CancellationToken cancellationToken)
            {
                var gjinia = await this.context.Gjinite.FindAsync(request.Id);

                return Result<Gjinia>.Success(gjinia);
            }
        }
    }
}
