using AutoMapper;
using EmployeeServer.Core.DTOs;
using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<EmployeePosition, EmployeePositionDto>().ReverseMap();
        }

    }
}
