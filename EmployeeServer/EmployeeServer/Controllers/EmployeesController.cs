using AutoMapper;
using EmployeeServer.Core.DTOs;
using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Services;
using EmployeeServer.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
      
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
           
            _mapper = mapper;

        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel model)
        {
            var newEmployee =await _employeeService.AddAsync(_mapper.Map<Employee>(model));
            return Ok(_mapper.Map<EmployeeDto>(newEmployee));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]

 
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel model)
        {
            var updateEmployee = await _employeeService.UpdateAsync(id, _mapper.Map<Employee>(model));
            return Ok(_mapper.Map<EmployeeDto>(updateEmployee));
           
        }
        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
