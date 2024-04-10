import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [DatePipe,MatFormFieldModule, 
    MatInputModule, MatTableModule,MatIconModule,MatButtonModule,  MatDialogModule, MatToolbarModule
   
   ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',

})


export class EmployeeListComponent implements OnInit {
  employees?: Employee[]
  employeesData: any[];

  dataSource = new MatTableDataSource<Employee>
  displayedColumns: string[] = ['identity','firstName', 'lastName','entryDate','options'];
  constructor(private router: Router, private _employeeService: EmployeeService,public dialog: MatDialog) { }

 
  
  ngOnInit(): void {
    this.initEmployees()
  }
initEmployees(): void{
  this._employeeService.getEmployeeList().subscribe(data => {
    this.dataSource = new MatTableDataSource<Employee>(data);
    this.employeesData=data

    console.log(this.employees)
  });
}

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  editEmployee(id:number){
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      data:{employeeId:id},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe();
  }
  deleteEmployee(id:number): void {
    this._employeeService.deleteEmployee(id).subscribe(() => {
      this.initEmployees();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '450px'
     
    });

    dialogRef.afterClosed().subscribe((res)=>{
        this.initEmployees();
    });
 
  }
  downloadExcel(): void {
    // יצירת אובייקט שמייצג את הקובץ אקסל
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeesData);
    // יצירת אובייקט שמייצג את הקובץ אקסל עם הנתונים
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    // המרת הקובץ אקסל למבנה ברור יותר של קובץ
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // הורדת הקובץ באמצעות יצירת עץ DOM והפניה אליו
    this.saveAsExcelFile(excelBuffer, 'employees_data');
  }


  // פונקציה זו מקבלת את הנתיב לקובץ ומקובץ את הנתונים לקובץ
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }
}
