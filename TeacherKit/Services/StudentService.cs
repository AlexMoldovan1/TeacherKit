using System;
using System.Collections.Generic;
using System.IO;
using AutoMapper;
using TeacherKit.Domain;
using TeacherKit.Domain.Models;
using TeacherKit.Domain.Repositories;
using TeacherKit.ViewModels;

namespace TeacherKit.Services
{
    public class StudentService : IStudentsService
    {
        private readonly IStudentsRepositoy _studentsRepository;
        private readonly IMapper _mapper;

        public StudentService(IStudentsRepositoy studentsRepository, IMapper mapper)
        {
            _studentsRepository = studentsRepository;
            _mapper = mapper;
        }

        public void AddStudent(StudentCommandViewModel student)
        {
            var filenames = HandleFileUploads(student);
            if (student.StudentsMediaFiles != null)
            {
                foreach (var data in student.StudentsMediaFiles)
                {
                    filenames.Add(data.ImageName);
                }
            }
            var studentModel = _mapper.Map<StudentModel>(student);
            AddUploadedFiles(studentModel, filenames);

            _studentsRepository.AddOrUpdateStudent(studentModel);
        }

        public void UpdateStudent(StudentViewModel student)
        { 
            var studentModel = _mapper.Map<StudentModel>(student);

            _studentsRepository.AddOrUpdateStudent(studentModel);
        }

        private List<string> HandleFileUploads(StudentCommandViewModel student)
        {
            var filenames = new List<string>();
            if (student.StudentsMedia == null || student.StudentsMedia.Count == 0)
            {
                return new List<string>();
            }

            foreach (var studentMedia in student.StudentsMedia)
            {
                string guid = Guid.NewGuid().ToString();
                var filename = guid + "." + Path.GetExtension(studentMedia.FileName).Substring(1);
                var directory = Directory.GetCurrentDirectory() + "\\ClientApp\\public\\Images";
                var path = Path.Combine(directory, filename);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    studentMedia.CopyTo(stream);
                    filenames.Add(filename);
                }
            }

            return filenames;
        }

        public StudentModel AddUploadedFiles(StudentModel student, List<string> studentsMedia)
        {
            student.StudentsMedia = new List<StudentMediaModel>();
            foreach (var filename in studentsMedia)
            {
                student.StudentsMedia.Add(new StudentMediaModel { ImageName = filename });
            }
            return student;
        }

        public void DeleteStudent(int studentId)
        {
            var student = _studentsRepository.GetStudentById(studentId);
            foreach (var studentMedia in student.StudentsMedia)
            {
                var filename = studentMedia.ImageName;
                var directory = Directory.GetCurrentDirectory() + "\\ClientApp\\public\\Images";
                var path = Path.Combine(directory, filename);
                try
                {
                    File.Delete(path);
                }
                catch (IOException)
                {
                    //log exception when logger will be present
                }
            }
            _studentsRepository.Delete(student);
        }

        public List<StudentQueryViewModel> GetAll(int userId)
        {
            return _mapper.Map<List<StudentQueryViewModel>>(_studentsRepository.GetAll(userId));
        }

        public StudentQueryViewModel GetById(int studentId)
        {
            return _mapper.Map<StudentQueryViewModel>(_studentsRepository.GetStudentById(studentId));
        }

        public List<StudentQueryViewModel> GetStudentsByClassId(int classId)
        {
            return _mapper.Map<List<StudentQueryViewModel>>(_studentsRepository.GetStudentsByClassId(classId));
        }

    }
}
