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
        private readonly IClassesRepository _classRepository;
        private readonly IMapper _mapper;

        public FilteredListService(IStudentsRepositoy studentsRepository, IClassesRepository classRepository, IMapper mapper)
        {
            _studentsRepository = studentsRepository;
            _classRepository = classRepository;
            _mapper = mapper;   
        }

        public List<FilteredListViewModel> GetAll(string keyword, int userId)
        {
            return GetFilteredStudents(keyword, userId);//.Union(GetFilteredClasses(keyword)).ToList();

        }

        public List<FilteredListViewModel> GetFilteredStudents(string keyword, int userId)
        {
            var studentsList = keyword != null ?
                _studentsRepository.GetByName(keyword)
                : _studentsRepository.GetAll(userId);

            return ConvertListMediaInMedia(_mapper.Map<List<FilteredListViewModel>>(studentsList), studentsList);
        }

        public List<FilteredListViewModel> GetFilteredClasses(string keyword, int userId)
        {
            var classesList = keyword != null ?
                _classRepository.GetClassByTitle(keyword)
                : _classRepository.GetAll(userId);

            return _mapper.Map<List<FilteredListViewModel>>(classesList);
        }
   


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
