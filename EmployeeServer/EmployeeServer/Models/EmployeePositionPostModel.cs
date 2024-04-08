using EmployeeServer.Core.Entities;

namespace EmployeeServer.Models
{
    public class EmployeePositionPostModel
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
