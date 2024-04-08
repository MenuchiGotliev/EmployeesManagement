using EmployeeServer.Core.Entities;

namespace EmployeeServer.Models
{
   
    public class EmployeePostModel
    {
            
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        
    }
}

