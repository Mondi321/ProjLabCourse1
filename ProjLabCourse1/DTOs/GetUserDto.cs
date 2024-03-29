﻿using Domain;
using ProjLabCourse1.Profiles;

namespace ProjLabCourse1.DTOs
{
    public class GetUserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        public ICollection<UserProfile> Rezervimet { get; set; }
        public ICollection<ReviewProfile> Reviews { get; set; }
        public ICollection<PorosiaProfile> Porosite { get; set; }
        public ICollection<string> Roli { get; set; }
    }
}
