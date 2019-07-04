using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeacherKit.Services;
using TeacherKit.ViewModels;

namespace TeacherKit.Controllers
{
    [Route("api/[controller]")]
    public class FilteredListController : Controller
    {
        private readonly IFilteredListService _filteredListService;

        public FilteredListController(IFilteredListService filteredListService)
        {
            this._filteredListService = filteredListService;
        }

        [Route("GetAllByKeyword/{keyword}")]
        public IEnumerable<FilteredListViewModel> GetAllByKeyword(string keyword, int userId)
        {
            return _filteredListService.GetAll(keyword, userId);
        }
    }
}
