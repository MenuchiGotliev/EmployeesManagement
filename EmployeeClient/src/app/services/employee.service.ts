import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    private baseUrl: string = 'https://localhost:7276/api/Employees';
  constructor(private http: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`)
  }

  setNewEmployee(employee: Employee): Observable<Employee> {
    return this.http.post(this.baseUrl, employee)
  }

  updateEmployee(employee: Employee, id: number): Observable<Employee> {
    return this.http.put(`${this.baseUrl}/${id}`, employee)
  }
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`);
  }
}