using proyectoreact.Helpers;
using proyectoreact.Helpers.Interfaces;
using proyectoreact.Models;
using proyectoreact.Services;
using proyectoreact.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

// Dependencias
builder.Services.AddScoped<ITareasServices, TareasServices>();
builder.Services.AddScoped<ITareasHerlper, TareasHelper>();

builder.Services.AddDbContext<DbpruebasContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
