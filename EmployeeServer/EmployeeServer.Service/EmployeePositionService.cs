using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using EmployeeServer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Service
{
    public class EmployeePositionService:IEmployeePositionService
    {
        private readonly IEmployeePositionRepository _employeePositionRepository;
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeePositionService(IEmployeePositionRepository employeePositionRepository, IEmployeeRepository employeeRepository)
        {
            _employeePositionRepository = employeePositionRepository;
            _employeeRepository = employeeRepository;
        }
        public async Task<IEnumerable<EmployeePosition>> AddPositionToEmployeeAsync(IEnumerable<EmployeePosition> employeePositions)
        {
            List<EmployeePosition> addedPositions = new List<EmployeePosition>();
            EmployeePosition addedPosition;
            foreach (EmployeePosition employeePosition in employeePositions)
            {
                Employee employee = await _employeeRepository.GetByIdAsync(employeePosition.EmployeeId);

                if (employeePosition.StartDate < employee.EntryDate)
                {
                    return null;
                }

                else
                {
                     addedPosition = await _employeePositionRepository.AddPositionToEmployeeAsync(employeePosition);
                    addedPositions.Add(addedPosition);
                }
              
            }

            return addedPositions;
        }

       
            

        public async Task<IEnumerable<EmployeePosition>> UpdatePositionToEmployeeAsync(int empoyeeId, IEnumerable< EmployeePosition> employeePositions)
        {
            List<EmployeePosition>updatedPositions = new List<EmployeePosition>();
           
            foreach (EmployeePosition employeePosition in employeePositions)
            {
                EmployeePosition updatedPosition =await _employeePositionRepository.UpdatePositionToEmployeeAsync(empoyeeId, employeePosition);
                updatedPositions.Add(updatedPosition);
            }
            return updatedPositions;
            
        }

        public async Task<bool> DeletePositionOfEmployeeAsync(int employeeId, int positionId)
        {
           return await _employeePositionRepository.DeletePositionOfEmployeeAsync(employeeId, positionId);
        }
        public async Task<IEnumerable<EmployeePosition>> GetEmployeePositionsAsync(int employeeId)
        {
            return await _employeePositionRepository.GetEmployeePositionsAsync(employeeId);
        }


    }
}
