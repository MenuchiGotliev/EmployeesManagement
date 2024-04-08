using EmployeeServer.Core.Mapping;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using EmployeeServer.Data.Repositories;
using EmployeeServer.Data;
using EmployeeServer.Mapping;
using EmployeeServer.Service;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IPositionRepository, PositionRepoisitory>();
builder.Services.AddScoped<IEmployeePositionRepository, EmplyeePositionRepository>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<IEmployeePositionService, EmployeePositionService>();

builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelsMappingProfile));

builder.Services.AddDbContext<DataContext>();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
