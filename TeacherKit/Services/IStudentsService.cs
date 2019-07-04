using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public interface IStudentsService
    {
        List<StudentQueryViewModel> GetAll(int userId);
        StudentQueryViewModel GetById(int id);
        void AddStudent(StudentCommandViewModel student);
        void UpdateStudent(StudentViewModel student);
        List<StudentQueryViewModel> GetStudentsByClassId(int classId);
        void DeleteStudent(int studentId);
    }
}
