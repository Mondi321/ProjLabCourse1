﻿using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gjinite
{
    public class GjiniaValidator : AbstractValidator<Gjinia>
    {
        public GjiniaValidator()
        {
            RuleFor(x => x.GjiniaE).NotEmpty();
        }
    }
}
