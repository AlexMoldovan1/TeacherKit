using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TeacherKit.Domain.Context;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain.Repositories
{
    public class ClassesRepository : IClassesRepository
    {
        private readonly TeacherKitContext _db;

        public ClassesRepository(TeacherKitContext db)
        {
            _db = db;
        }

        public List<ClassModel> GetAll()
        {
            return _db.Classes
                .Include(cl => cl.ClassesMediaFiles)
                .Include(cl => cl.Groups)
                .Include(cl => cl.Notes)
                .Include(cl => cl.ClassMediaIcon)
                .Include(cl => cl.Students)
                .ToList();
        }

        public ClassModel GetClassById(int classId)
        {
            return _db.Classes.Find(classId);
        }

        public void AddClass(ClassModel classModel)
        {
            _db.Classes.Add(classModel);
            _db.SaveChanges();
        }

        //public void AddStudentToClass(ClassModel classModel)
        //{
        //    if (classModel.Id == 0) return;
        //    var classEntity = _db.Classes.Include("Students").FirstOrDefault(it => it.Id == classModel.Id);

        //    if (classEntity == null) return;
        //    DeleteData(classEntity.Students);
        //    classEntity.Students.AddRange(classModel.Students);
        //    _db.Classes.Update(classEntity);

        //    var student = classModel.Students.FirstOrDefault(x => x.Id == classEntity.Students.FirstOrDefault(y => y.Id == x.Id).Id);
        //    var studentEntity = _db.Students.Include("ClassModel").Include("Notes").Include("ParentInfo").Include("StudentsMedia").FirstOrDefault(it => it.Id == student.Id);

        //    //studentEntity.ClassModel = classModel;
        //    student.ClassModel = classModel;
        //    _db.Entry(studentEntity).State = EntityState.Deleted;
        //    _db.Students.Update(student);

        //    _db.Students.Update(student ?? throw new InvalidOperationException());
        //    _db.SaveChanges();

        //}


        public void AddOrUpdateClass(ClassModel classModel)
        {
            if (classModel.Id != 0)
            {
                var classEntity = _db.Classes.Include("ClassMediaIcon").Include("ClassesMediaFiles").Include("Students").Include("Groups").Include("Notes").FirstOrDefault(it => it.Id == classModel.Id);

                if (classEntity != null)
                {
                    classEntity.Title = classModel.Title;
                    classEntity.Code = classModel.Code;
                    classEntity.CourseStartDate = classModel.CourseStartDate;
                    classEntity.CourseEndDate = classModel.CourseEndDate;
                    classEntity.Stars = classModel.Stars;

                    _db.Entry(classEntity.ClassMediaIcon).State = EntityState.Deleted;
                    _db.ClassMediaIcon.Update(classModel.ClassMediaIcon);

                    DeleteData(classEntity.Groups);
                    classEntity.Groups.AddRange(classModel.Groups);

                    DeleteData(classEntity.Notes);
                    classEntity.Notes.AddRange(classModel.Notes);

                    DeleteData(classEntity.ClassesMediaFiles);
                    classEntity.ClassesMediaFiles.AddRange(classModel.ClassesMediaFiles);

                    _db.Classes.Update(classEntity);
                }
            }
            else
            {
                _db.Classes.Add(classModel);
            }

            _db.SaveChanges();
        }

        public List<ClassModel> GetClassByTitle(string keyword)
        {
            return _db.Classes
                .Include(data => data.ClassesMediaFiles)
                .Where(classModel => classModel.Title.Contains(keyword)).ToList();
        }

        public void DeleteData<T>(List<T> data) where T : class
        {
            foreach (var entity in data)
            {
                _db.Entry(entity).State = EntityState.Deleted;
            }
        }
    }
}