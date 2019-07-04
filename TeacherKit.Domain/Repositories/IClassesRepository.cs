using System.Collections.Generic;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain.Repositories
{
    public interface IClassesRepository
    {
        List<ClassModel> GetAll(int userId);
        ClassModel GetClassById(int id);
        void AddClass(ClassModel classModel);
        void AddOrUpdateClass(ClassModel classModel);
        List<ClassModel> GetClassByTitle(string keyword);
    }
}