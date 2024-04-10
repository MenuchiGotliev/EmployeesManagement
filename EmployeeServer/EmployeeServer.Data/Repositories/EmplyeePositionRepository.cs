using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace EmployeeServer.Data.Repositories
{
    public class EmplyeePositionRepository:IEmployeePositionRepository
    {
        private readonly DataContext _dataContext;
        public EmplyeePositionRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<EmployeePosition> AddPositionToEmployeeAsync(EmployeePosition employeePosition)
        {
            //האם התפקיד כבר קים אבל לא פעיל(מחוק 
            var position = await _dataContext.EmployeePositions.FirstOrDefaultAsync(e => employeePosition.PositionId == e.PositionId && e.EmployeeId == employeePosition.EmployeeId && e.EmployeePositionStatus == false);
            if (position != null)
            {                     
                position.EmployeePositionStatus = true;
                var updatePosition = await UpdatePositionToEmployeeAsync(employeePosition.EmployeeId,employeePosition);
                await _dataContext.SaveChangesAsync();
                return updatePosition;

            }
            await _dataContext.EmployeePositions.AddAsync(employeePosition);
            await _dataContext.SaveChangesAsync();

            return employeePosition;


        }
        public async Task<EmployeePosition> UpdatePositionToEmployeeAsync(int empoyeeId,EmployeePosition employeePosition)
        {
              
                var position = await _dataContext.EmployeePositions.FirstOrDefaultAsync(e => employeePosition.PositionId == e.PositionId && e.EmployeeId == empoyeeId);
                if (position == null)
                {
                return null;
                }
                position.IsManagement = employeePosition.IsManagement;
                position.StartDate = employeePosition.StartDate;
                await _dataContext.SaveChangesAsync();
                
                return position;
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
