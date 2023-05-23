using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrogDate.API.Models;

namespace FrogDate.API.Dtos
{
    public class UserForDetailedDto
    {
     public int Id { get; set; }   
     public string? Username { get; set; }   


     public string? Gender{get;set;}
     public string? Age {get;set;}
     public string? ZodiacSign {get;set;}
     public DateTime Created {get;set;}
     public DateTime LastActive {get;set;}
     public string? City {get;set;}
     public string? Country {get;set;}

     public string? Growth { get; set; }
     public string? EyeColour { get; set; }
     public string? SkinColour { get; set; }
     public string? MartialStatus { get; set; }
     public string? Education { get; set; }
     public string? Profession { get; set; }
     public string? Children { get; set; }
     public string? Languages { get; set; }
     public string? Motto { get; set; }
     public string? Description { get; set; }
     public string? Personality { get; set; }
     public string? LookingFor { get; set; }
     public string? Intrests { get; set; }
     public string? FreeTime { get; set; }
     public string? Sports { get; set; }
     public string? Films { get; set; }
     public string? Music { get; set; }
     //pref
     public string? ILike { get; set; }
     public string? Idisslike { get; set; }
     public string? MakesMeLaught { get; set; }
     public string? IFellsBestIn { get; set; }
     public string? FriendsDescribeMe { get; set; }
     //pics
     public ICollection<PhotoForDetailedDto> Photos { get; set; }
     public string? PhotoUrl {get;set;}

    }
}