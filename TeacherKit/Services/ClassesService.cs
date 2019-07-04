using System;
using System.Collections.Generic;
using System.IO;
using AutoMapper;
using Hangfire;
using TeacherKit.Domain.Models;
using TeacherKit.Domain.Repositories;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public class ClassesService : IClassesService
    {
        private readonly IClassesRepository _classesRepository;
        private readonly IMapper _mapper;

        public ClassesService(IClassesRepository classesRepository, IMapper mapper)
        {
            _classesRepository = classesRepository;
            _mapper = mapper;
        }

        public List<ClassesQueryViewModel> GetAll(int userId)
        {
            return _mapper.Map<List<ClassesQueryViewModel>>(_classesRepository.GetAll(userId));
        }

        //public void AddStudentToClass(ClassesCommandViewModel classCommandModel)
        //{
        //    _classesRepository.AddStudentToClass(_mapper.Map<ClassModel>(classCommandModel));
        //}


        public void AddOrUpdateClass(ClassesCommandViewModel classCommandModel)
        {
            var filenames = HandleUploadFilesMedia(classCommandModel);

            if (classCommandModel.ClassesMediaModel != null)
            {
                foreach (var data in classCommandModel.ClassesMediaModel)
                {
                    filenames.Add(data.ImageName);
                }
            }
            var classModel = _mapper.Map<ClassModel>(classCommandModel);

            AddUploadedFiles(classModel, filenames);

            var filename = HandleUploadFileIcon(classCommandModel);

            if (classCommandModel.ClassIconModel != null && string.IsNullOrEmpty(filename))
                classModel.ClassMediaIcon = new ClassMediaIcon() { Id = classCommandModel.ClassIconModel.Id, ImageName = classCommandModel.ClassIconModel.ImageName };
            else
            {
                classModel.ClassMediaIcon = new ClassMediaIcon()
                {
                    ImageName = filename
                };
            }

            _classesRepository.AddOrUpdateClass(classModel);
        }

        private static string HandleUploadFileIcon(ClassesCommandViewModel classModel)
        {
            if (classModel.ClassIconCommandModel == null)
            {
                return string.Empty;
            }
            var guid = Guid.NewGuid().ToString();
            var filename = guid + "." + Path.GetExtension(classModel.ClassIconCommandModel.FileName).Substring(1);
            var directory = Directory.GetCurrentDirectory() + "\\ClientApp\\public\\Images";
            var path = Path.Combine(directory, filename);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            using (var stream = new FileStream(path, FileMode.Create))
            {
                classModel.ClassIconCommandModel.CopyTo(stream);
            }
            return filename;
        }

        private static List<string> HandleUploadFilesMedia(ClassesCommandViewModel classModel)
        {
            var filenames = new List<string>();
            if (classModel.ClassMediaCommandModel == null || classModel.ClassMediaCommandModel.Count == 0)
            {
                return new List<string>();
            }

            foreach (var classMedia in classModel.ClassMediaCommandModel)
            {
                var guid = Guid.NewGuid().ToString();
                var filename = guid + "." + Path.GetExtension(classMedia.FileName).Substring(1);
                var directory = Directory.GetCurrentDirectory() + "\\ClientApp\\public\\Images";
                var path = Path.Combine(directory, filename);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    classMedia.CopyTo(stream);
                    filenames.Add(filename);
                }
            }
            return filenames;
        }

        public ClassModel AddUploadedFiles(ClassModel classModel, List<string> clasesMedia)
        {
            classModel.ClassesMediaFiles = new List<ClassMediaModel>();
            foreach (var filename in clasesMedia)
            {
                classModel.ClassesMediaFiles.Add(new ClassMediaModel() { ImageName = filename });
            }
            return classModel;
        }

        public ClassesQueryViewModel GetClassById(int id)
        {
            return _mapper.Map<ClassesQueryViewModel>(_classesRepository.GetClassById(id));
        }
    }
}