using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using TeacherKit.Domain.Context;

namespace TeacherKit.Domain.Repositories
{
    public class StudentsRepository : IStudentsRepositoy
    {
        private readonly TeacherKitContext _db;

        public StudentsRepository(TeacherKitContext db)
        {
            _db = db;
        }

        public List<StudentModel> GetAll()
        {
            return _db.Students
                .Include(e => e.StudentsMedia)
                .Include(e => e.Notes)
                .Include(e => e.ParentInfo)
                .ToList();
        }

        public StudentModel GetStudentById(int id)
        {
            return _db.Students
                .Include(e => e.StudentsMedia)
                .Include(e => e.Notes)
                .SingleOrDefault(item => item.Id == id);
        }

        public List<StudentModel> GetByName(string keyword)
        {
            return _db.Students
                .Include(data => data.StudentsMedia)
                .Include(data => data.Notes)
                .Where(item => item.FirstName.Contains(keyword) || item.LastName.Contains(keyword))
                .ToList();
        }

        public void AddOrUpdateStudent(StudentModel student)
        {
            if (student.Id != 0)
            {
                var studentEntity = _db.Students.Include("Notes").Include("ParentInfo").Include("StudentsMedia").FirstOrDefault(it => it.Id == student.Id);
                if (studentEntity != null)
                {
                    studentEntity.FirstName = student.FirstName;
                    studentEntity.LastName = student.LastName;
                    studentEntity.Code = student.Code;
                    studentEntity.Age = student.Age;
                    studentEntity.Gender = student.Gender;
                    studentEntity.Phone = student.Phone;
                    studentEntity.Email = student.Email;
                    studentEntity.Adress = student.Adress;
                    studentEntity.Star = student.Star;
                    studentEntity.ClassModelId = student.ClassModelId;
                    _db.Entry(studentEntity.ParentInfo).State = EntityState.Deleted;
                    _db.ParentInfo.Update(student.ParentInfo);

                    DeleteData(studentEntity.StudentsMedia);
                    studentEntity.StudentsMedia.AddRange(student.StudentsMedia);

                    DeleteData(studentEntity.Notes);
                    studentEntity.Notes.AddRange(student.Notes);

                    _db.Students.Update(studentEntity);
                }
            }
            else
            {
                _db.Students.Add(student);
            }

            _db.SaveChanges();
        }

        public void Delete(StudentModel student)
        {
            _db.Notes.RemoveRange(student.Notes);
            _db.StudentMediaModel.RemoveRange(student.StudentsMedia);
            _db.ParentInfo.RemoveRange((from parentInfo in _db.ParentInfo
                where student.ParentInfo.Id == parentInfo.Id
                select parentInfo).ToList());
            _db.Students.Remove(student);
            _db.SaveChanges();
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
