using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Ushqimet
{
    public class UshqimiValidator : AbstractValidator<Ushqimi>
    {
        public UshqimiValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
            RuleFor(x => x.Perberesit).NotEmpty();
            RuleFor(x => x.Cmimi).NotEmpty();
        }
    }
}
