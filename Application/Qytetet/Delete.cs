using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Qytetet
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var qyteti = await this.context.Qytetet.FindAsync(request.Id);

                this.context.Qytetet.Remove(qyteti);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete qyteti");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
