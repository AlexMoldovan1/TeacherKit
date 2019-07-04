using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TeacherKit.Services;
using TeacherKit.ViewModels;

namespace TeacherKit.Controllers
{
    [Route("api/[controller]")]
    public class ClassesController : Controller
    {
        private readonly IClassesService _classesService;

        public ClassesController(IClassesService classesService)
        {
            _classesService = classesService;
        }

        [Route("All/{id}")]
        public object All(int id)
        {
            return _classesService.GetAll(id);
        }

        [Route("AddClass")]
        public ActionResult Add(ClassesCommandViewModel classCommandModel)
        {
            var classInputData = JsonConvert.DeserializeObject<ClassesCommandViewModel>(classCommandModel.InputData);
            classInputData.ClassMediaCommandModel = classCommandModel.ClassMediaCommandModel;
            classInputData.ClassIconCommandModel = classCommandModel.ClassIconCommandModel;

            var GMT3StartDate = classInputData.CourseStartDate;
            var CourseStartDate = GMT3StartDate.ToLocalTime();
            classInputData.CourseStartDate = CourseStartDate;

            var GMT3EndDate = classInputData.CourseEndDate;
            var CourseEndDate = GMT3EndDate.ToLocalTime();
            classInputData.CourseEndDate = CourseEndDate;

            _classesService.AddOrUpdateClass(classInputData);
            return Ok(new { status = "Ok" });
        }

        [Route("GetClassById/{id}")]
        public ClassesQueryViewModel GetClassById(int id)
        {
            return _classesService.GetClassById(id);
        }
    }
}