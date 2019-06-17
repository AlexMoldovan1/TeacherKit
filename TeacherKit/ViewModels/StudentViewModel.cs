using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using TeacherKit.Domain.Models;

namespace TeacherKit.ViewModels
{
    public class StudentViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Code { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public bool Star { get; set; }
        public ParentInfoViewModel ParentInfo { get; set; }
        public virtual List<MediaViewModel> StudentsMediaFiles { get; set; }
        public List<NotesViewModel> Notes { get; set; }
    }

    public class StudentCommandViewModel : StudentViewModel
    {
        public List<IFormFile> StudentsMedia { get; set; }
        public string InputData { get; set; }
    }

    public class StudentQueryViewModel : StudentViewModel
    {
        public List<StudentMediaModel> StudentsMedia { get; set; }
    }
}
