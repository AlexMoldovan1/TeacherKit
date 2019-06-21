using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using TeacherKit.Domain;
using TeacherKit.Domain.Repositories;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public class FilteredListService : IFilteredListService
    {
        private readonly IStudentsRepositoy _studentsRepository;
        //private readonly IClassesRepositoy _classRepository;
        private readonly IMapper _mapper;

        public FilteredListService(IStudentsRepositoy studentsRepository, IMapper mapper)
        {
            _studentsRepository = studentsRepository;
            _mapper = mapper;   
        }

        public List<FilteredListViewModel> GetAll(string keyword)
        {
            return GetFilteredStudents(keyword);//.Union(GetFilteredClasses(keyword)).ToList();

        }

        public List<FilteredListViewModel> GetFilteredStudents(string keyword)
        {
            var studentsList = keyword != null ?
                _studentsRepository.GetByName(keyword)
                : _studentsRepository.GetAll();

            return ConvertListMediaInMedia(_mapper.Map<List<FilteredListViewModel>>(studentsList), studentsList);
        }

        public List<FilteredListViewModel> GetFilteredClasses(string keyword)
        {
            return null;
        }
        //    var classes = new List<ClassModel>();
            //    if (keyword != null)
            //        classes = _classRepository.GetByNameOrDescription(keyword);
            //    else
            //        classes = _classRepository.GetAll();
            //    return ConvertCategoryInListCategory(_mapper.Map<List<FilteredListViewModel>>(classes), classes);
            //}
            //}

            private static List<FilteredListViewModel> ConvertListMediaInMedia(List<FilteredListViewModel> models, List<StudentModel> students)
        {
            var modelAndStudents = models.Zip(students, (m, s) => new { ItemFromModels = m, ItemFromStudents = s });
            foreach (var tuple in modelAndStudents)
            {
                tuple.ItemFromModels.FilteredListMedia = new MediaViewModel() { Id = tuple.ItemFromStudents.StudentsMedia[0].Id, ImageName = tuple.ItemFromStudents.StudentsMedia[0].ImageName };
            }
            return models;
        }
    }
}
