﻿using System;
using System.Collections.Generic;
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
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender  { get; set; }
        public bool EmployeeStatus { get; set; }
        public Employee()
        {
            EmployeeStatus = true;
        }
    }
}