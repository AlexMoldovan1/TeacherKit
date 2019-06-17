using Microsoft.EntityFrameworkCore.Migrations;

namespace TeacherKit.Domain.Migrations
{
    public partial class AddStarToStudentModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Star",
                table: "Students",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Star",
                table: "Students");
        }
    }
}
