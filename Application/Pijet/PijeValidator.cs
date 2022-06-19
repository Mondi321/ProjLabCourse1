using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Pijet
{
    public class PijeValidator : AbstractValidator<Pije>
    {
        public PijeValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Perberesit).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
        }
    }
}
