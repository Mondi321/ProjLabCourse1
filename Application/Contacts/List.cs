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

namespace Application.Contacts
{
    public class List
    {
        public class Query : IRequest<Result<List<Contact>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Contact>>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<List<Contact>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Contact>>.Success(await this.context.Contacts.ToListAsync());
            }
        }
    }
}
