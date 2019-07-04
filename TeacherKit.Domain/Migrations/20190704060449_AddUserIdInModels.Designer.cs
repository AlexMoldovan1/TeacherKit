﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TeacherKit.Domain.Context;

namespace TeacherKit.Domain.Migrations
{
    [DbContext(typeof(TeacherKitContext))]
    [Migration("20190704060449_AddUserIdInModels")]
    partial class AddUserIdInModels
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TeacherKit.Domain.Models.ClassMediaIcon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImageName");

                    b.HasKey("Id");

                    b.ToTable("ClassMediaIcon");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.ClassMediaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassModelId");

                    b.Property<string>("ImageName");

                    b.HasKey("Id");

                    b.HasIndex("ClassModelId");

                    b.ToTable("ClassMediaModels");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.ClassModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassMediaIconId");

                    b.Property<int>("Code");

                    b.Property<DateTime>("CourseEndDate");

                    b.Property<DateTime>("CourseStartDate");

                    b.Property<bool>("Stars");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ClassMediaIconId");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.GroupModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassModelId");

                    b.Property<string>("Content");

                    b.HasKey("Id");

                    b.HasIndex("ClassModelId");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.NoteModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClassModelId");

                    b.Property<string>("NoteContent");

                    b.Property<int?>("StudentModelId");

                    b.HasKey("Id");

                    b.HasIndex("ClassModelId");

                    b.HasIndex("StudentModelId");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.ParentInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adress");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone");

                    b.HasKey("Id");

                    b.ToTable("ParentInfo");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.StudentMediaModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImageName");

                    b.Property<int?>("StudentModelId");

                    b.HasKey("Id");

                    b.HasIndex("StudentModelId");

                    b.ToTable("StudentMediaModel");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.Property<string>("TokenGuid");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TeacherKit.Domain.StudentModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Adress");

                    b.Property<int>("Age");

                    b.Property<int>("ClassModelId");

                    b.Property<int>("Code");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<string>("LastName");

                    b.Property<int?>("ParentInfoId");

                    b.Property<string>("Phone");

                    b.Property<bool>("Star");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ClassModelId");

                    b.HasIndex("ParentInfoId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.ClassMediaModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.Models.ClassModel")
                        .WithMany("ClassesMediaFiles")
                        .HasForeignKey("ClassModelId");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.ClassModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.Models.ClassMediaIcon", "ClassMediaIcon")
                        .WithMany()
                        .HasForeignKey("ClassMediaIconId");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.GroupModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.Models.ClassModel")
                        .WithMany("Groups")
                        .HasForeignKey("ClassModelId");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.NoteModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.Models.ClassModel")
                        .WithMany("Notes")
                        .HasForeignKey("ClassModelId");

                    b.HasOne("TeacherKit.Domain.StudentModel")
                        .WithMany("Notes")
                        .HasForeignKey("StudentModelId");
                });

            modelBuilder.Entity("TeacherKit.Domain.Models.StudentMediaModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.StudentModel")
                        .WithMany("StudentsMedia")
                        .HasForeignKey("StudentModelId");
                });

            modelBuilder.Entity("TeacherKit.Domain.StudentModel", b =>
                {
                    b.HasOne("TeacherKit.Domain.Models.ClassModel")
                        .WithMany("Students")
                        .HasForeignKey("ClassModelId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TeacherKit.Domain.Models.ParentInfo", "ParentInfo")
                        .WithMany()
                        .HasForeignKey("ParentInfoId");
                });
#pragma warning restore 612, 618
        }
    }
}
