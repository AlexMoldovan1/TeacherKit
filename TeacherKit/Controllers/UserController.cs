using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TeacherKit.Domain.Exceptions;
using TeacherKit.Services;
using TeacherKit.ViewModels;

namespace TeacherKit.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("[action]")]
        public void Register([FromBody] UserViewModel user)
        {
            _userService.AddUser(user);
        }

        [HttpPost("[action]")]
        public UserViewModel LogIn([FromBody] UserViewModel user)
        {
            return _userService.LogIn(user.Email, user.Password);
        }


        [HttpPost("[action]")]
        public void LogOut([FromBody] UserViewModel user)
        {
            _userService.LogOut(user);
        }

        [HttpGet("[action]")]
        public IEnumerable<UserViewModel> All()
        {
            return _userService.GetAll();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromBody] UserCommandViewModel user)
        {
            try
            {
                _userService.Update(user);
                return StatusCode(200);
            }
            catch (ArgumentException)
            {
                return StatusCode(400);
            }
            catch (InexistentResourceException)
            {
                return StatusCode(401);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
