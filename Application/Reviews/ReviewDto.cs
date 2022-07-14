using Application.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Reviews
{
    public class ReviewDto
    {
        public Guid Id { get; set; }
        public string Mesazhi { get; set; } = string.Empty;
        public int RatingValue { get; set; }
        public string AppUserId { get; set; } = string.Empty;
        public Profile User { get; set; }
    }
}
