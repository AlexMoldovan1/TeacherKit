using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public interface IUserService
    {
        void AddUser(UserViewModel user);
        UserViewModel LogIn(string username, string password);
        List<UserViewModel> GetAll();
        void LogOut(UserViewModel user);
        void Update(UserCommandViewModel updatedUser);
    }
}
