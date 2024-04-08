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
    public class PositionService:IPositionService
    {
        private readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public async Task<Position> AddAsync(Position position)
        {
            return await _positionRepository.AddAsync(position);
        }

        public async Task<bool> DeleteAsync(int id)
        {
          return  await _positionRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _positionRepository.GetAllAsync();
        }

        public async Task<Position> GetByIdAsync(int id)
        {
            return await _positionRepository.GetByIdAsync(id);
        }

        public async Task<Position> UpdateAsync( Position position)
        {
             return await _positionRepository.UpdateAsync( position);
        }



       

        
    }
}
