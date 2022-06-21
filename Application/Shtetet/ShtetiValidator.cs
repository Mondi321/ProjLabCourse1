using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Shtetet
{
    public class ShtetiValidator : AbstractValidator<Shteti>
    {
        public ShtetiValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.EmriPostal).NotEmpty();
        }
    }
}
