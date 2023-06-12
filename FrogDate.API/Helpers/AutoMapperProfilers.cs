using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FrogDate.API.Dtos;
using FrogDate.API.Models;

namespace FrogDate.API.Helpers
{
    public class AutoMapperProfilers:Profile
    {
        public AutoMapperProfilers()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest=>dest.PhotoUrl, opt =>{
                    opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
                })
                .ForMember(dest=>dest.Age, opt=>{
                    opt.ResolveUsing(src=>src.DayOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                    .ForMember(dest=>dest.PhotoUrl, opt =>{
                    opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
                })
                                .ForMember(dest=>dest.Age, opt=>{
                    opt.ResolveUsing(src=>src.DayOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo,PhotoForReturnDto>();   
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UserForRegisterDto,User>();
            CreateMap<MessageForCreationDto,Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>()
                    .ForMember(m => m.SenderPhotoUrl, opt => opt
                        .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                    .ForMember(m => m.RecipientPhotoUrl, opt => opt
                        .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}