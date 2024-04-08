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
    public class EmplyeePositionRepository:IEmployeePositionRepository
    {
        private readonly DataContext _dataContext;
        public EmplyeePositionRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<IEnumerable<EmployeePosition>> AddPositionToEmployeeAsync(IEnumerable<EmployeePosition> employeePositions)
        {
            foreach (var employeePosition in employeePositions)
            {
                await _dataContext.EmployeePositions.AddAsync(employeePosition);
                _dataContext.SaveChanges();

            }
            return employeePositions;

          
        }
        public async Task<IEnumerable<EmployeePosition>> UpdatePositionToEmployeeAsync(int empoyeeId, IEnumerable<EmployeePosition> employeePositions)
        {
            foreach (var employeePosition in employeePositions)
            {
                var position = await _dataContext.EmployeePositions.FirstOrDefaultAsync(e => employeePosition.PositionId == e.PositionId && e.EmployeeId == empoyeeId);
                if (position == null)
                {
                    return null;
                }
                position.IsManagement = employeePosition.IsManagement;
                position.StartDate = employeePosition.StartDate;
                await _dataContext.SaveChangesAsync();
                
            }
           return employeePositions;
        }

        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
            var employeePosition = await _dataContext.EmployeePositions.FirstOrDefaultAsync(e => e.EmployeeId == employeeId && e.PositionId == positionId);

            if (employeePosition != null)
            {
                employeePosition.EmployeePositionStatus = false;
                await _dataContext.SaveChangesAsync();
                return true; 
            }

            return false; 
        }
        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _dataContext.EmployeePositions.Where(e => e.EmployeeId == employeeId).Where(p=>p.EmployeePositionStatus).ToListAsync();
        }


    }
}
