using System;
using System.Collections.Generic;

namespace TeacherKit.Domain.Models
{
    public class ClassModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Code { get; set; }
        public DateTime CourseStartDate { get; set; }
        public DateTime CourseEndDate { get; set; }
        public List<GroupModel> Groups { get; set; }
        public List<NoteModel> Notes { get; set; }
        public bool Stars { get; set; }
        public List<ClassMediaModel> ClassesMediaFiles { get; set; }
        public ClassMediaIcon ClassMediaIcon { get; set; }
        public List<StudentModel> Students { get; set; }
        public int UserId { get; set; }
    }
}