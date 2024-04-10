import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [MatIconModule,
    MatDialogModule,
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
  positionslist: Position[]
  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog,
    private employeePositionService: EmployeePositionService,
    private _positionService: PositionService
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
      updatePositions: this.formBuilder.array([]),
      addPositions: this.formBuilder.array([]),
      deletePositions: this.formBuilder.array([])
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
    console.log(this.employeeForm.value)
    console.log(this.employeeForm.valid)
    if (this.employeeForm.valid) {
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
      this.deleteEmployeePositions();

      this.router.navigate(['/employee-list']);
      this.dialogRef.close();
    }

  }
  private createPositionFormGroup(positionData?: any): FormGroup {
    return this.formBuilder.group({
      employeeId: this.data.employeeId,
      positionId: [positionData ? positionData.positionId : '', Validators.required],
      startDate: [positionData ? positionData.startDate : '', Validators.required, this.validateEntryDate.bind(this)],
      isManagement: [positionData ? positionData.isManagement : false]
    });

  }
  getPositionsEmployeeList() {
    this.employeePositionService.getPositionEmployeeList(this.data.employeeId).subscribe((positions: EmployeePosition[]) => {
      if (positions && positions.length > 0) {
        positions.forEach((position) => {
          this.updatePosition(position);

        });
      }
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

  updateEmployeePositions() {
    // Add positions for the employee
    const positionsFormArray = this.employeeForm.get('updatePositions') as FormArray;
    const positionsData = positionsFormArray.value;

    this.employeePositionService.updateEmployeePositons(this.data.employeeId, positionsData).subscribe(
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

  deleteEmployeePositions() {
    const positionsFormArray = this.employeeForm.get('deletePositions') as FormArray;
    const positionsData = positionsFormArray.value;

    positionsData.forEach((position) => {
      // Call the service to delete the existing position from the server
      this.employeePositionService.deleteEmployeePosition(this.data.employeeId, position.positionId).subscribe(
        (response) => {
          console.log('Employee position delete successfully:', response);
        },
        (error) => {
          console.error('Error delete employee position:', error);
        }
      );
    });
  }
  get updatePositions(): FormArray {
    return this.employeeForm.get('updatePositions') as FormArray;
  }
  get addPositions(): FormArray {
    return this.employeeForm.get('addPositions') as FormArray;
  }
  get deletePositions(): FormArray {
    return this.employeeForm.get('deletePositions') as FormArray;
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
    const positionsFormArray = this.employeeForm.get('updatePositions') as FormArray;


    const deletePositionsFormArray = this.employeeForm.get('deletePositions') as FormArray;
    console.log(positionsFormArray.value[index])
    deletePositionsFormArray.push(this.createPositionFormGroup(positionsFormArray.value[index]));
    positionsFormArray.removeAt(index);
  }


  removeNewPosition(index: number): void {
    const positionsFormArray = this.employeeForm.get('addPositions') as FormArray;
    positionsFormArray.removeAt(index);
  }

  isPositionSelected(positionId: number): boolean {
    const selectedPositionIds = this.addPositions.controls.map(control => control.get('positionId').value);
    const selectedUpPositionIds = this.updatePositions.controls.map(control => control.get('positionId').value);
    return selectedPositionIds.includes(positionId) || selectedUpPositionIds.includes(positionId);
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
