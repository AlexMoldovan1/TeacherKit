using System;
using System.Collections.Generic;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain
{
    public class StudentModel
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
        public bool Star { get; set; } = false;
        public ParentInfo ParentInfo { get; set; }
        public virtual List<StudentMediaModel> StudentsMedia { get; set; }
        public List<NoteModel> Notes { get; set; }
    }
}
