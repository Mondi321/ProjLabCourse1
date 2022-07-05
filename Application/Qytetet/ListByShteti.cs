using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Qytetet
{
    public class ListByShteti
    {
        public class Query : IRequest<Result<List<QytetiDto>>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<QytetiDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<QytetiDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var qyteti = await this.context.Qytetet.Where(x => x.ShtetiId == request.Id).ToListAsync();

                var qytetiR = this.mapper.Map<List<QytetiDto>>(qyteti);

                return Result<List<QytetiDto>>.Success(qytetiR);
            }
        }
    }
}
