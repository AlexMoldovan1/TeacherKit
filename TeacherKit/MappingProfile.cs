using AutoMapper;
using TeacherKit.Domain;
using TeacherKit.Domain.Models;
using TeacherKit.ViewModels;

namespace TeacherKit
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<StudentModel, StudentQueryViewModel>()
                .ForMember(d => d.StudentsMediaFiles, opt => opt.MapFrom(x => x.StudentsMedia))
                .ForMember(d => d.ParentInfo, opt => opt.MapFrom(x => x.ParentInfo))
                .ForMember(d => d.Notes, opt => opt.MapFrom(x => x.Notes));
            CreateMap<StudentCommandViewModel, StudentModel>()
                .ForMember(StudentCommandViewModel => StudentCommandViewModel.StudentsMedia,
                    mediaViewModelInModel => mediaViewModelInModel.Ignore());
            CreateMap<UserViewModel, UserModel>();
            CreateMap<UserModel, UserViewModel>();
            CreateMap<ParentInfoViewModel, ParentInfo>();
            CreateMap<ParentInfo, ParentInfoViewModel>();
            CreateMap<NotesViewModel, NoteModel>();
            CreateMap<NoteModel, NotesViewModel>();
            CreateMap<StudentMediaModel, MediaViewModel>();
            CreateMap<MediaViewModel, StudentMediaModel>();
            CreateMap<StudentModel, FilteredListViewModel>(MemberList.Destination)
                .ForMember(d => d.FilteredListMedia, opt => opt.Ignore())
                .ForMember(d => d.Type, opt => opt.MapFrom(x => FilteredType.Student));
        }
    }
}
