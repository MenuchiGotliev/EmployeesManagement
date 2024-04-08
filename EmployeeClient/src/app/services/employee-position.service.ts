import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeePosition } from '../models/employee-position.model';



@Injectable({
  providedIn: 'root'
})
export class EmployeePositionService {

    private baseUrl: string = 'https://localhost:7276/api/EmployeePosition';
  constructor(private http: HttpClient) { }

  getPositionEmployeeList(id:number): Observable<EmployeePosition[]> {
    return this.http.get<EmployeePosition[]>(`${this.baseUrl}/${id}`); 
  }

  addNewEmployeePositions(employeePositions: EmployeePosition[]): Observable<EmployeePosition[]> { 
    return this.http.post<EmployeePosition[]>(this.baseUrl, employeePositions); 
  }
 
  updateEmployeePositons(employeeId:number,employeePositions:EmployeePosition[]): Observable<EmployeePosition[]> {
    return this.http.put<EmployeePosition[]>(`${this.baseUrl}/${employeeId}/positions`, employeePositions)
  }
  deleteEmployeePosition(employeeId: number,positionId:Number): Observable<EmployeePosition> {
    return this.http.delete<EmployeePosition>(`${this.baseUrl}/${employeeId}/position/${positionId}`);
  }
}