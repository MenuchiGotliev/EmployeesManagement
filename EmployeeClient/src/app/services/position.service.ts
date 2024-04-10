import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';
import { EmployeePositionService } from './employee-position.service';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PositionService {
    private baseUrl: string = 'https://localhost:7276/api/Position';
  constructor(private http: HttpClient,private employeePositionService:EmployeePositionService) { }

  getPositionList(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl)
  }

  getPositionById(id: number): Observable<Position> {
    return this.http.get<Position>(`${this.baseUrl}/${id}`)
  }

  // setNewPosition(position: Position): Observable<Position> {
  //   return this.http.post(this.baseUrl, position)
  // }

  // updatePosition(position: Position, id: number): Observable<Position> {
  //   return this.http.put(`${this.baseUrl}/${id}`, position)
  // }
  deletePosition(id: number): Observable<Position> {
    return this.http.delete<Position>(`${this.baseUrl}/${id}`);
  }
 
}