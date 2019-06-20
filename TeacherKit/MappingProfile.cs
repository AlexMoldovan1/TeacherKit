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
            CreateMap<StudentViewModel, StudentModel>()
                .ForMember(d => d.StudentsMedia, opt => opt.MapFrom(x => x.StudentsMediaFiles));
            CreateMap<ClassModel, ClassesQueryViewModel>()
                .ForMember(d => d.ClassMediaQueryModel, opt => opt.MapFrom(x => x.ClassesMediaFiles))
                .ForMember(d => d.ClassesMediaModel, opt => opt.MapFrom(x => x.ClassesMediaFiles))
                .ForMember(d => d.ClassIconQueryModel, opt => opt.MapFrom(x => x.ClassMediaIcon))
                .ForMember(d => d.ClassIconModel, opt => opt.MapFrom(x => x.ClassMediaIcon))
                .ForMember(d => d.Students, opt => opt.MapFrom(x => x.Students));
            CreateMap<ClassesCommandViewModel, ClassModel> ()
                .ForMember(d => d.ClassesMediaFiles, opt => opt.Ignore())
                .ForMember(d => d.ClassMediaIcon, opt => opt.Ignore());
            CreateMap<UserViewModel, UserModel>();
            CreateMap<UserModel, UserViewModel>();
            CreateMap<ParentInfoViewModel, ParentInfo>();
            CreateMap<ParentInfo, ParentInfoViewModel>();
            CreateMap<NotesViewModel, NoteModel>();
            CreateMap<GroupViewModel, GroupModel>();
            CreateMap<GroupModel, GroupViewModel>();
            CreateMap<ClassMediaModel, ClassViewMediaModel>();
            CreateMap<ClassMediaIcon, ClassViewMediaModel>();
            CreateMap<NoteModel, NotesViewModel>();
            CreateMap<StudentMediaModel, MediaViewModel>();
            CreateMap<MediaViewModel, StudentMediaModel>();
            CreateMap<StudentModel, FilteredListViewModel>(MemberList.Destination)
                .ForMember(d => d.FilteredListMedia, opt => opt.Ignore())
                .ForMember(d => d.Type, opt => opt.MapFrom(x => FilteredType.Student));
        }
    }
}
