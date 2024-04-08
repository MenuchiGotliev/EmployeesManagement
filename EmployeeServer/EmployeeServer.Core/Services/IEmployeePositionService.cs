using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Services
{
    public interface IEmployeePositionService
    {
        Task<IEnumerable<EmployeePosition>> AddPositionToEmployeeAsync(IEnumerable<EmployeePosition> employeePositions);
        Task<IEnumerable<EmployeePosition>> UpdatePositionToEmployeeAsync(int employeeId, IEnumerable<EmployeePosition> employeePositions);

        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId);
        Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId);
    }
}
