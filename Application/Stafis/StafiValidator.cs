using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Stafis
{
    public class StafiValidator : AbstractValidator<Stafi>
    {
        public StafiValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Mbiemri).NotEmpty();
            RuleFor(x => x.Detyra).NotEmpty();
            RuleFor(x => x.ShtetiId).NotEmpty();
            RuleFor(x => x.QytetiId).NotEmpty();
            RuleFor(x => x.GjiniaId).NotEmpty();
            RuleFor(x => x.BankaId).NotEmpty();
            RuleFor(x => x.Adresa).NotEmpty();
            RuleFor(x => x.DataLindjes).NotEmpty();
        }
    }
}
