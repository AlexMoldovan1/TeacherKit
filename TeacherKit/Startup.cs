using AutoMapper;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TeacherKit.Domain.Context;
using TeacherKit.Domain.Repositories;
using TeacherKit.Services;

namespace TeacherKit
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IStudentsRepositoy, StudentsRepository>();
            services.AddTransient<IClassesRepository, ClassesRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IStudentsService, StudentService>();
            services.AddTransient<IClassesService, ClassesService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IFilteredListService, FilteredListService>();
            services.AddSingleton<TeacherKitContext>();
            services.AddSingleton(typeof(IConnectionStringProvider), new ConnectionStringProvider(Configuration.GetConnectionString("TeacherKit")));
            services.AddAutoMapper();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            GlobalConfiguration.Configuration.UseSqlServerStorage(Configuration.GetConnectionString("TeacherKit"));
            services.AddHangfire(x => x.UseSqlServerStorage(Configuration.GetConnectionString("TeacherKit")));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
                //configuration.RootPath = "client-app/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
