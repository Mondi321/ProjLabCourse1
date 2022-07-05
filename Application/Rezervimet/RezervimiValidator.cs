using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Rezervimet
{
    public class RezervimiValidator : AbstractValidator<Rezervimi>
    {
        public RezervimiValidator()
        {
            RuleFor(x => x.Data).NotEmpty();
            RuleFor(x => x.NrPersonave).NotEmpty();
            RuleFor(x => x.Mesazhi).NotEmpty();
        }
    }
}
