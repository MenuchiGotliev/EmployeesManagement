import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AddEmployeePositionComponent } from '../add-employee-position/add-employee-position.component';
import { EmployeePositionService } from '../../services/employee-position.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatCheckboxModule,MatCardModule,MatDatepickerModule,MatButtonModule, MatDialogModule,MatFormFieldModule, 
    MatInputModule,ReactiveFormsModule,
    CommonModule,   
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    
    ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router:Router,
    public dialog: MatDialog,
    private employeePositionService: EmployeePositionService,
  ) {
   
  }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      identity: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      entryDate: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required], 
      positions: this.formBuilder.array([])
    });
  }

  onSubmit(): void {
   

    const newEmployee: Employee = {
      identity: this.employeeForm.value.identity,
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      entryDate: this.employeeForm.value.entryDate,
      birthDate: this.employeeForm.value.birthDate,
      gender: this.employeeForm.value.gender
    };

    console.log(newEmployee);

    // Add the employee
    this.employeeService.setNewEmployee(newEmployee).subscribe((data) => {
      if (data) {
        console.log("Employee added successfully:", data);
        this.savePositions(data)
        // Add positions for the employee
      
      }
    });
    
  }

savePositions(data:Employee)
 {
  const positionsFormArray = this.employeeForm.get('positions') as FormArray;
  const positionsData = positionsFormArray.value;
  positionsData.forEach((position: any)=> {
   
   position.employeeId = data.id
   console.log(position)
   
  });
  this.employeePositionService.addNewEmployeePositions(positionsData).subscribe(
    (response) => {
      console.log('Employee position added successfully:', response);
    },
    (error) => {
      console.error('Error adding employee position:', error);
    }
  );

  this.router.navigate(['/employee-list']);
  this.dialogRef.close();
 }
  onCancel(): void {
    this.dialogRef.close();
  }
  get positions(): FormArray {
    return this.employeeForm.get('positions') as FormArray;
  }
  addPosition(): void {
    const positionsFormArray = this.employeeForm.get('positions') as FormArray;
    positionsFormArray.push(this.createPositionFormGroup());
  }

  removePosition(index: number): void {
    const positionsFormArray = this.employeeForm.get('positions') as FormArray;
    positionsFormArray.removeAt(index);
  }

  private createPositionFormGroup() {
    return this.formBuilder.group({
      employeeId: 0,
      positionId: ['', Validators.required],
      startDate: ['', Validators.required],
      isManagement: ['', Validators.required]
    });
  }
}


