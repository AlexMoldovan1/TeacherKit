using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeacherKit.ViewModels
{
    public class FilteredListViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Star { get; set; }
        public FilteredType Type { get; set; }
        public MediaViewModel FilteredListMedia { get; set; }
    }
}
