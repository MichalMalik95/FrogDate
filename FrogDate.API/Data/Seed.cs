using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FrogDate.API.Models;
using Newtonsoft.Json;

namespace FrogDate.API.Data
{
    public class Seed
    {
        
        private readonly DataContext _context;
        

        public Seed(DataContext context)
        {
            _context = context;
            
        }

        public void SeedUsers()
        {
            var userData = File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            
            foreach(var user in users)
            {
                byte[]passwordHash,passwordSalt;
                CreatePasswordHashSalt("password", out passwordHash,out passwordSalt);
                user.PasswordHash=passwordHash;
                user.PasswordSalt=passwordSalt;
                user.Username=user.Username.ToLower();
                user.Children="";

                _context.Users.Add(user);

            }
            _context.SaveChanges();
        }
        

        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            }
        }

    }
}