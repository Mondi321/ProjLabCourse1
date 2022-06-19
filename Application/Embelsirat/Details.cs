using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Embelsirat
{
    public class Details
    {
        public class Query : IRequest<Result<Embelsira>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Embelsira>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Embelsira>> Handle(Query request, CancellationToken cancellationToken)
            {
                var embelsira = await this.context.Embelsirat.FindAsync(request.Id);

                return Result<Embelsira>.Success(embelsira);
            }
        }
    }
}
