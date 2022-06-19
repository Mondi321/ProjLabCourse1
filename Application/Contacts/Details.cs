using Application.Core;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contacts
{
    public class Details
    {
        public class Query : IRequest<Result<Contact>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Contact>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Contact>> Handle(Query request, CancellationToken cancellationToken)
            {
                var contact = await this.context.Contacts.FindAsync(request.Id);

                return Result<Contact>.Success(contact);
            }
        }
    }
}
