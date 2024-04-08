using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Data.Repositories
{
    public class EmployeeRepository:IEmployeeRepository
    {
        private readonly DataContext _dataContext;

        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _dataContext.Employees.FindAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees
                .Where(e=>e.EmployeeStatus).ToListAsync();
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            await _dataContext.Employees.AddAsync(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateAsync(int id, Employee employee)
        {
            var updateEmployee = await _dataContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (updateEmployee == null)
            {
                return null;
            }
            updateEmployee.FirstName = employee.FirstName;
            updateEmployee.LastName =  employee.LastName;
            updateEmployee.Identity =  employee.Identity;
            updateEmployee.Gender =    employee.Gender;
            updateEmployee.BirthDate = employee.BirthDate;
            updateEmployee.EntryDate = employee.EntryDate;

            await _dataContext.SaveChangesAsync();

            return employee;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var employee = await _dataContext.Employees.FirstOrDefaultAsync(e => e.Id == id );

            if (employee != null)
            {
                var positions = await _dataContext.EmployeePositions.Where(ep => ep.EmployeeId == employee.Id).ToListAsync();
                foreach (var position in positions)
                {
                    position.EmployeePositionStatus = false;
                }
                employee.EmployeeStatus = false;

                await _dataContext.SaveChangesAsync();
                return true; 
            }
         
            
            return false; 
        }

   
    }
}



