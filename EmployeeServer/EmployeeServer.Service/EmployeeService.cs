using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Service
{
    public class EmployeeService:IEmployeeService
    {
        private readonly IEmployeeRepository _EmployeeRepository;

        public EmployeeService(IEmployeeRepository EmployeeRepository)
        {
            _EmployeeRepository = EmployeeRepository;
        }

        public async Task<Employee> AddAsync(Employee Employee)
        {
           return await _EmployeeRepository.AddAsync(Employee);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _EmployeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _EmployeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _EmployeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(int id, Employee Employee)
        {
            return await _EmployeeRepository.UpdateAsync(id, Employee);
        }



       
    }
}
