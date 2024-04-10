import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatIconModule,MatCheckboxModule,MatCardModule,MatDatepickerModule,MatButtonModule, MatDialogModule,MatFormFieldModule, 
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
  positionslist:Position[]
 
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router:Router,
    public dialog: MatDialog,
    private employeePositionService: EmployeePositionService,
    private _positionService:PositionService
  ) {
   
  }

  ngOnInit(): void {
    this._positionService.getPositionList().subscribe(positions => {
      console.log(positions)
      this.positionslist = positions;
      
    });
    this.employeeForm = this.formBuilder.group({
      identity: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      entryDate: ['', Validators.required],
      birthDate: ['', Validators.required, this.validateBirthDate.bind(this)], 
      gender: ['', Validators.required], 
      positions: this.formBuilder.array([])
    });
    
  }
  validateEntryDate(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      const startDate = new Date(control.value);
  
      if (new Date(this.employeeForm.value.entryDate) > startDate) {
        resolve({ invalidateEntryDate: true });
      } else {
        resolve(null);
      }
    });
  }
    validateBirthDate(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve) => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
  
      if (age < 16) {
        resolve({ underSixteen: true });
      } else {
        resolve(null);
      }
    });
  }
  
  onSubmit(): void {
   
if(this.employeeForm.valid)
{
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
    
      this.router.navigate(['/employee-list']);
      this.employeeService.getEmployeeList().subscribe();
      this.dialogRef.close();
    },
    (error) => {
      console.error('Error adding employee position:', error);
    }
  );
 

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
      startDate: ['', Validators.required,this.validateEntryDate.bind(this)],
      isManagement: ['', Validators.required]
    });
  }

  isPositionSelected(positionId: number): boolean {
    const selectedPositionIds = this.positions.controls.map(control => control.get('positionId').value);
    return selectedPositionIds.includes(positionId);
  }
  
}



