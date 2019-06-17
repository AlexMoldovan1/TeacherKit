using System;
using System.Collections.Generic;
using System.Text;

namespace TeacherKit.Domain.Repositories
{
    public interface IStudentsRepositoy
    {
        List<StudentModel> GetAll();
        StudentModel GetStudentById(int id);
        List<StudentModel> GetByName(string keyword);
        void AddOrUpdateStudent(StudentModel student);
        void Delete(StudentModel student);
    }
}
