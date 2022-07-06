using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Eventet
{
    public class Details
    {
        public class Query : IRequest<Result<Eventi>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Eventi>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Eventi>> Handle(Query request, CancellationToken cancellationToken)
            {
                var eventi = await this.context.Eventet.FindAsync(request.Id);

                return Result<Eventi>.Success(eventi);
            }
        }
    }
}
