using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace TeacherKit.ViewModels
{
    public class ClassViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Code { get; set; }
        public DateTime CourseStartDate { get; set; }
        public DateTime CourseEndDate { get; set; }
        public List<GroupViewModel> Groups { get; set; }
        public List<NotesViewModel> Notes { get; set; }
        public bool Stars { get; set; }
        public List<ClassViewMediaModel> ClassesMediaModel{ get; set; }
        public List<StudentViewModel> Students{ get; set; }
        public ClassViewMediaModel ClassIconModel { get; set; }

    }

    public class ClassesCommandViewModel : ClassViewModel
    {
        public List<IFormFile> ClassMediaCommandModel { get; set; }
        public IFormFile ClassIconCommandModel { get; set; }
        public string InputData { get; set; }
    }

    public class ClassesQueryViewModel : ClassViewModel
    {
        public List<ClassViewMediaModel> ClassMediaQueryModel { get; set; }
        public ClassViewMediaModel ClassIconQueryModel { get; set; }

    }
}
