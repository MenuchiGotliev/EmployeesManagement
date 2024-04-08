import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeePosition } from '../../models/employee-position.model';
import { EmployeeService } from '../../services/employee.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EmployeePositionService } from '../../services/employee-position.service';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatCardModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {


  employeeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog,
    private employeePositionService: EmployeePositionService,
  ) {

  }
  private createPositionFormGroup(positionData?: any): FormGroup {
    return this.formBuilder.group({
      employeeId: this.data.employeeId,
      positionId: [positionData ? positionData.positionId : '', Validators.required],
      startDate: [positionData ? positionData.startDate : '', Validators.required],
      isManagement: [positionData ? positionData.isManagement : false]
    });

  }
  getPositionsEmployeeList(){
    this.employeePositionService.getPositionEmployeeList(this.data.employeeId).subscribe((positions: EmployeePosition[]) => {
      if (positions && positions.length > 0) {
        positions.forEach((position) => {
          this.updatePosition(position);

        });
      }
    });
  }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      identity: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      entryDate: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      updatePositions: this.formBuilder.array([]),
      addPositions: this.formBuilder.array([])
    });

    // Get the employee's details
    this.employeeService.getEmployeeById(this.data.employeeId).subscribe((employee: Employee) => {
      if (employee) {
        this.employeeForm.patchValue({
          identity: employee.identity,
          firstName: employee.firstName,
          lastName: employee.lastName,
          entryDate: employee.entryDate,
          birthDate: employee.birthDate,
          gender: employee.gender
        });

        // Get the employee's positions
        this.getPositionsEmployeeList()
      }
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
    this.employeeService.updateEmployee(newEmployee, this.data.employeeId).subscribe((data) => {
      if (data) {
        console.log("Employee update successfully:", data);
      }
    });
    this.addEmployeePositions()
    this.updateEmployeePositions()


    this.router.navigate(['/employee-list']);
    this.dialogRef.close();
  }

  updateEmployeePositions() {
    // Add positions for the employee
    const positionsFormArray = this.employeeForm.get('updatePositions') as FormArray;
    const positionsData = positionsFormArray.value;

    this.employeePositionService.updateEmployeePositons(this.data.employeeId,positionsData).subscribe(
      (response) => {
        console.log('Employee position update successfully:', response);
      },
      (error) => {
        console.error('Error update employee position:', error);
      }
    );
  }
  addEmployeePositions() {
   
    const positionsFormArray = this.employeeForm.get('addPositions') as FormArray;
    const positionsData = positionsFormArray.value;
    this.employeePositionService.addNewEmployeePositions(positionsData).subscribe(
      (response) => {
        console.log('Employee position add successfully:', response);
      },
      (error) => {
        console.error('Error add employee position:', error);
      }
    );
  }


  get updatePositions(): FormArray {
    return this.employeeForm.get('updatePositions') as FormArray;
  }
  get addPositions(): FormArray {
    return this.employeeForm.get('addPositions') as FormArray;
  }


  updatePosition(positionData?: any): void {
    const positionsFormArray = this.employeeForm.get('updatePositions') as FormArray;
    positionsFormArray.push(this.createPositionFormGroup(positionData));
  }
  addPosition(): void {
    const positionsFormArray = this.employeeForm.get('addPositions') as FormArray;
    positionsFormArray.push(this.createPositionFormGroup());
  }
  removeExistPosition(index: number): void {
   

    // Call the service to delete the existing position from the server
    const positionId = this.updatePositions.value[index].positionId;
    this.employeePositionService.deleteEmployeePosition(this.data.employeeId, positionId).subscribe(
      (response) => {
        console.log('Employee position delete successfully:', response);
      },
      (error) => {
        console.error('Error delete employee position:', error);
      }
    );
     // Remove the existing position from the form
     const positionsFormArray = this.employeeForm.get('updatePositions') as FormArray;
     positionsFormArray.removeAt(index);
}

  removeNewPosition(index: number): void {
    const positionsFormArray = this.employeeForm.get('addPositions') as FormArray;
    positionsFormArray.removeAt(index);
  }

 

  onCancel(): void {
    this.dialogRef.close();
  }
}
