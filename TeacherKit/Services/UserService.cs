using AutoMapper;
using System;
using System.Collections.Generic;
using TeacherKit.Domain.Exceptions;
using TeacherKit.Domain.Models;
using TeacherKit.Domain.Repositories;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public void AddUser(UserViewModel user)
        {
            EmailSend.SendEmailTo(user.Email, "Registered at Teacher Kit", "You have registered succesfully " + user.FirstName + " " + user.LastName);
            user.Password = PasswordEncoder.EncodePasswordMd5(user.Password);
            user.TokenGuid = null;
            _userRepository.AddUser(_mapper.Map<UserModel>(user));
        }

        public UserViewModel LogIn(string username, string password)
        {
            var matchedUser = _userRepository.GetUser(username);

            if (matchedUser == null) return new UserViewModel();
            if (!matchedUser.Password.Equals(PasswordEncoder.EncodePasswordMd5(password))) return new UserViewModel();
            if (matchedUser.TokenGuid != null) return _mapper.Map<UserViewModel>(matchedUser);
            var guidString = System.Guid.NewGuid().ToString();
            matchedUser.TokenGuid = guidString;
            _userRepository.Update(matchedUser);
            return _mapper.Map<UserViewModel>(matchedUser);

        }

        public List<UserViewModel> GetAll()
        {
            return _mapper.Map<List<UserViewModel>>(_userRepository.GetAll());
        }

        public void LogOut(UserViewModel user)
        {
            var matchedUser = _userRepository.GetUser(user.Email);

            if (matchedUser == null) return;
            matchedUser.TokenGuid = null;
            _userRepository.Update(matchedUser);

        }
        public void Update(UserCommandViewModel updatedUser)
        {
            if (updatedUser.FirstName.Equals("") || updatedUser.LastName.Equals("") || updatedUser.Email.Equals("") ||
                updatedUser.OldPassword.Equals("") || updatedUser.NewPassword.Equals("") || updatedUser.RepeatPassword.Equals(""))
            {
                throw new ArgumentException("Empty field");
            }
            if (!updatedUser.NewPassword.Equals(updatedUser.RepeatPassword))
            {
                throw new ArgumentException("New password is not the same as Repeat Password");
            }
            var actualUser = _userRepository.GetUser(updatedUser.Id, PasswordEncoder.EncodePasswordMd5(updatedUser.OldPassword));
            if (actualUser == null)
            {
                throw new InexistentResourceException("Invalid combination of id and password");
            }
            actualUser.FirstName = updatedUser.FirstName;
            actualUser.LastName = updatedUser.LastName;
            actualUser.Email = updatedUser.Email;
            actualUser.Password = PasswordEncoder.EncodePasswordMd5(updatedUser.NewPassword);
            _userRepository.Update(actualUser);
        }

    }
}
