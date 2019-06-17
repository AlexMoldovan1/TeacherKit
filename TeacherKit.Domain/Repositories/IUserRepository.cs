using System;
using System.Collections.Generic;
using System.Text;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain.Repositories
{
    public interface IUserRepository
    {
        void AddUser(UserModel user);
        void Update(UserModel userModel);
        List<UserModel> GetAll();
        UserModel GetUser(string email);
        UserModel GetUser(int id, string password);
    }
}
