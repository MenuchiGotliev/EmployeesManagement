using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();

        Task<Employee> GetByIdAsync(int employeeId);

        Task<Employee> AddAsync(Employee employee);

        Task<Employee> UpdateAsync(int id,Employee employee);

        Task<bool> DeleteAsync(int employeeId);
    }
}
