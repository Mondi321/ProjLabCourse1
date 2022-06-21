using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Bankat
{
    public class BankaValidator : AbstractValidator<Banka>
    {
        public BankaValidator()
        {
            RuleFor(x => x.Emri).NotEmpty();
        }
    }
}
