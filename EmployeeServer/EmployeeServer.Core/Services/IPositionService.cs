using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Services
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetAllAsync();

        Task<Position> GetByIdAsync(int positionId);

        Task<Position> AddAsync(Position position);

        Task<Position> UpdateAsync(Position position);

        Task<bool> DeleteAsync(int positionId);
    }
}
