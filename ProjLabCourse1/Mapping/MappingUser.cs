using AutoMapper;
using Domain;
using ProjLabCourse1.DTOs;

namespace ProjLabCourse1.Mapping
{
    public class MappingUser : Profile
    {
        public MappingUser()
        {
            CreateMap<AppUser, GetUserDto>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photo.Url));
            CreateMap<Rezervimi, Profiles.UserProfile>()
                .ForMember(d => d.Data, o => o.MapFrom(s => s.Data))
                .ForMember(d => d.NrPersonave, o => o.MapFrom(s => s.NrPersonave))
                .ForMember(d => d.Mesazhi, o => o.MapFrom(s => s.Mesazhi));
            CreateMap<Review, Profiles.ReviewProfile>()
                .ForMember(d => d.Mesazhi, o => o.MapFrom(s => s.Mesazhi))
                .ForMember(d => d.RatingValue, o => o.MapFrom(s => s.RatingValue));
        }
    }
}
