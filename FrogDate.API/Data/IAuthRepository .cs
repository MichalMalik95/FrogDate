using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrogDate.API.Models;

namespace FrogDate.API.Data
{
    public interface IAuthRepository 
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExist(string username);
    }
}