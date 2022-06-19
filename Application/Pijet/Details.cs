using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Pijet
{
    public class Details
    {
        public class Query : IRequest<Result<Pije>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Pije>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Pije>> Handle(Query request, CancellationToken cancellationToken)
            {
                var pije = await this.context.Pijet.FindAsync(request.Id);

                return Result<Pije>.Success(pije);
            }
        }
    }
}
