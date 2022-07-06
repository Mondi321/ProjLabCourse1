using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Eventet
{
    public class EventiValidator : AbstractValidator<Eventi>
    {
        public EventiValidator()
        {
            RuleFor(x => x.Titulli).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
            RuleFor(x => x.Pershkrimi).NotEmpty();
        }
    }
}
