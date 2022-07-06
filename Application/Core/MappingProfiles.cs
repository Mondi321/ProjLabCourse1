using Application.Qytetet;
using Application.Rezervimet;
using Application.Stafis;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Ushqimi, Ushqimi>();
            CreateMap<Pije, Pije>();
            CreateMap<Embelsira, Embelsira>();
            CreateMap<Contact, Contact>();
            CreateMap<Gjinia, Gjinia>();
            CreateMap<Shteti, Shteti>();
            CreateMap<Qyteti, QytetiDto>();
            CreateMap<Banka, Banka>();
            CreateMap<Rezervimi, Rezervimi>();
            CreateMap<Rezervimi, RezervimiDto>()
                .ForMember(d => d.User, o => o.MapFrom(s => s.AppUser));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));
            CreateMap<Eventi, Eventi>();
        }
    }
}
