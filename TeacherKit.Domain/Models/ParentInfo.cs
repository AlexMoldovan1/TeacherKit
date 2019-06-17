using System;
using System.Collections.Generic;
using System.Text;

namespace TeacherKit.Domain.Models
{
    public class ParentInfo
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone{ get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
    }
}
