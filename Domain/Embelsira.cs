﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Embelsira
    {
        public Guid Id { get; set; }
        public string Emri { get; set; } = string.Empty;
        public string Perberesit { get; set; } = string.Empty;
        public Double Cmimi { get; set; }
    }
}