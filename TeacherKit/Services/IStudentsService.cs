using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public interface IStudentsService
    {
        List<StudentQueryViewModel> GetAll();
        StudentQueryViewModel GetById(int id);
        void AddOrUpdateStudent(StudentCommandViewModel student);
        void DeleteStudent(int studentId);
    }
}
