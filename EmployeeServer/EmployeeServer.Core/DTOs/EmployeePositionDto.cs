using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.DTOs
{
    public class EmployeePositionDto
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public DateTime EntryDate { get; set; }
        public Employee Employee { get; set; }
        public Position Position { get; set; }
        public bool IsManagement { get; set; }
    }
}
