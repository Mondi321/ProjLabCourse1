using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Qytetet
{
    public class QytetiValidator : AbstractValidator<Qyteti>
    {
        public QytetiValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
        }
    }
}
