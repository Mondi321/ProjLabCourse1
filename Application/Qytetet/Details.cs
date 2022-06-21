using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Qytetet
{
    public class Details
    {
        public class Query : IRequest<Result<QytetiDto>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<QytetiDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<QytetiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var qyteti = await this.context.Qytetet.FindAsync(request.Id);

                var qytetiR = this.mapper.Map<QytetiDto>(qyteti);

                return Result<QytetiDto>.Success(qytetiR);
            }
        }
    }
}
