using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using TeacherKit.Services;
using TeacherKit.ViewModels;

namespace TeacherKit.Controllers
{
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly IStudentsService _studentsService;

        public StudentsController(IStudentsService studentsService)
        {
            _studentsService = studentsService; 
        }

        [Route("All/{id}")]
        public object All(int id)
        {
            return _studentsService.GetAll(id);
        }

        [Route("GetStudentById/{id}")]
        public StudentQueryViewModel GetStudentById(int id)
        {
            return _studentsService.GetById(id);
        }


        [Route("GetStudentsByClassId/{id}")]
        public List<StudentQueryViewModel> GetStudentsByClassId(int id)
        {
            return _studentsService.GetStudentsByClassId(id);
        }

        [Route("AddStudent")]
        public ActionResult AddStudent(StudentCommandViewModel student)
        {
            var studentInputData = JsonConvert.DeserializeObject<StudentCommandViewModel>(student.InputData);
            studentInputData.StudentsMedia = student.StudentsMedia;
            _studentsService.AddStudent(studentInputData);
            return Ok(new { status = "Ok" });
        }

        [Route("UpdateStudent")]
        public ActionResult UpdateStudent([FromBody]StudentViewModel student)
        {
            _studentsService.UpdateStudent(student);
            return Ok(new { status = "Ok" });
        }

        [HttpDelete("[action]")]    
        public ActionResult Delete([FromBody] int studentId)
        {
            try
            {
                _studentsService.DeleteStudent(studentId);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}
