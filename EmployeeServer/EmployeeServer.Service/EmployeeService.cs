using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using EmployeeServer.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Service
{
    public class EmployeeService:IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            var existingEmployees = await _employeeRepository.GetAllAsync();
            if (existingEmployees.Any(e => employee.Identity == e.Identity) || employee.EntryDate.Day < DateTime.Now.Day ||
               employee.EntryDate.Year - 16 < employee.BirthDate.Year
                || employee.Identity.Length != 9)
            {
                throw new ArgumentException("Employee is  not valid.", nameof(employee));
            }

            return await _employeeRepository.AddAsync(employee);
        }


        public async Task<bool> DeleteAsync(int id)
        {
            return await _employeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee Employee)
        {
            return await _employeeRepository.UpdateAsync(id, Employee);
        }



       
    }
}
