using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stafis
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Stafi Stafi{ get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Stafi).SetValidator(new StafiValidator());
            }
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
                var stafi = await this.context.Stafis.FindAsync(request.Stafi.StafiId);

                if (stafi == null) return null;

                stafi.Emri = request.Stafi.Emri;
                stafi.Mbiemri = request.Stafi.Mbiemri;
                stafi.Detyra = request.Stafi.Detyra;
                stafi.ShtetiId = request.Stafi.ShtetiId;
                stafi.QytetiId = request.Stafi.QytetiId;
                stafi.QytetiId = request.Stafi.QytetiId;
                stafi.GjiniaId = request.Stafi.GjiniaId;
                stafi.BankaId = request.Stafi.BankaId;
                stafi.Adresa = request.Stafi.Adresa;

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update Qyteti");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
