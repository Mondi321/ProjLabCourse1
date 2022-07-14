using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Reviews
{
    public class List
    {
        public class Query : IRequest<Result<List<ReviewDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ReviewDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<ReviewDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reviews = await this.context.Reviews
                    .ProjectTo<ReviewDto>(this.mapper.ConfigurationProvider)
                    .ToListAsync();

                return Result<List<ReviewDto>>.Success(reviews);
            }
        }
    }
}
