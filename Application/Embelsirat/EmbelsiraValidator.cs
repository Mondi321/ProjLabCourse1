using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Embelsirat
{
    public class EmbelsiraValidator : AbstractValidator<Embelsira>
    {
        public EmbelsiraValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Perberesit).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
        }
    }
}
