using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Entities
{
    public enum Gender
    {
        Male,
        Female 
    }
    public class Employee
    {
        
        public int Id { get; set; }
        [Required]
        public string Identity { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime EntryDate { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public Gender Gender  { get; set; }
        public bool EmployeeStatus { get; set; }
        public Employee()
        {
            EmployeeStatus = true;
        }
    }
}
