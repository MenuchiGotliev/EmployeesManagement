using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Entities
{
    public class EmployeePosition
    {

        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public DateTime StartDate { get; set; }
        public Employee Employee { get; set; }
        public Position Position { get; set; }
        public bool IsManagement { get; set; }
        public bool EmployeePositionStatus { get; set; }
        public EmployeePosition()
        {
            EmployeePositionStatus = true;

        }

    }
}
