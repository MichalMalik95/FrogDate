using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrogDate.API.Models;
using FrogDate.API.Helpers;

namespace FrogDate.API.Data
{
    
    public interface IUserRepository:IGenericRepository
    {
        Task<PageList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);

        Task<Photo>GetMainPhotoForUser(int userId);
        Task<Likes>GetLikes(int userId, int recipientId);
        
    }
}