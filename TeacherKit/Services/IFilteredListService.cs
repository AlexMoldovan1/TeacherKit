using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public interface IFilteredListService
    {
        List<FilteredListViewModel> GetAll(string keyword, int userId);
    }
}
