using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Shtetet
{
    public class Details
    {
        public class Query : IRequest<Result<Shteti>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Shteti>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Shteti>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shteti = await this.context.Shtetet.FindAsync(request.Id);

                return Result<Shteti>.Success(shteti);
            }
        }
    }
}
