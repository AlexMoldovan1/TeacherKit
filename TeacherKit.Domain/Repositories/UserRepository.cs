using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TeacherKit.Domain.Context;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TeacherKitContext _db;

        public UserRepository(TeacherKitContext db)
        {
            _db = db;
        }

        public void AddUser(UserModel user)
        {
            _db.Users.Add(user);
            _db.SaveChanges();
        }

        public void Update(UserModel userModel)
        {
            _db.Entry(userModel).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public List<UserModel> GetAll()
        {
            return _db.Users.ToList();
        }

        public UserModel GetUser(string email)
        {
            return _db.Users.FirstOrDefault(x => x.Email == email);
        }

        public UserModel GetUser(int id, string password)

        {

            return (from user in _db.Users

                    where user.Id.Equals(id) && user.Password.Equals(password)

                    select user).FirstOrDefault();

        }
    }
}
