using Microsoft.EntityFrameworkCore;
using TeacherKit.Domain.Models;

namespace TeacherKit.Domain.Context
{
    public class TeacherKitContext : DbContext
    {
        private string ConnectionString { get; }
        public DbSet<StudentModel> Students { get; set; }
        public DbSet<NoteModel> Notes{ get; set; }
        public DbSet<ParentInfo> ParentInfo { get; set; }
        public DbSet<StudentMediaModel> StudentMediaModel { get; set; }
        public DbSet<UserModel> Users { get; set; }

        public TeacherKitContext()
        {
            ConnectionString = "Server=.\\SQLEXPRESS;Database=TeacherKit;Trusted_Connection=True;";
        }

        public TeacherKitContext(IConnectionStringProvider connectionStringProvider)
        {
            ConnectionString = connectionStringProvider.ConnectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }
}
