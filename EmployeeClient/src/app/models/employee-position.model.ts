import { Employee } from "./employee.model"
import { Position } from "./position.model"

export class EmployeePosition {
    employeeId?: number
    positionId?: number
    startDate?: Date
    employee?: Employee
    position?: Position
    isManagement?: boolean
    EmployeePositionStatus?: boolean
}
