using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Repositories
{
    public interface IEmployeePositionRepository
    {
        Task<IEnumerable<EmployeePosition>> AddPositionToEmployeeAsync(IEnumerable<EmployeePosition> employeePositions);
        Task<IEnumerable<EmployeePosition>> UpdatePositionToEmployeeAsync(int empoyeeId, IEnumerable<EmployeePosition> employeePositions);
        Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId);
        Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId);


    }
}
