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
    public class PositionRepoisitory:IPositionRepository
    {


        private readonly DataContext _dataContext;

        public PositionRepoisitory(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<Position> GetByIdAsync(int id)
        {
            return await _dataContext.Positions.FindAsync(id);
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _dataContext.Positions.ToListAsync();
        }

        public async Task<Position> AddAsync(Position position)
        {
            await _dataContext.Positions.AddAsync(position);
            await _dataContext.SaveChangesAsync();
            return position;
        }

        public async Task<Position> UpdateAsync(Position position)
        {
            _dataContext.Positions.Update(position);
            await _dataContext.SaveChangesAsync();
            return position;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var position = await _dataContext.Positions.FindAsync(id);
            _dataContext.Positions.Remove(position);
            await _dataContext.SaveChangesAsync();
            return true;    
        }

    }

}


