using System.Collections.Generic;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public interface IClassesService
    {
        List<ClassesQueryViewModel> GetAll();
        void AddOrUpdateClass(ClassesCommandViewModel classCommandModel);
        //void AddStudentToClass(ClassesCommandViewModel classCommandModel);
        ClassesQueryViewModel GetClassById(int id);
    }
}