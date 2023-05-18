 using Ui_TwitterAPI.Core;
using Ui_TwitterAPI.Core.IF;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var AllowSpecificOrigins = "_AllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {
                          policy
                          .AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod() 
                           ;
                      });
});
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<IGetOAuthInfo,GetOAuthInfo>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(AllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
