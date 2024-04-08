import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeePosition } from '../../models/employee-position.model';
import { EmployeeService } from '../../services/employee.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EmployeePositionService } from '../../services/employee-position.service';
@Component({
  selector: 'app-add-employee-position',
  imports: [MatDialogModule,CommonModule, ReactiveFormsModule],//,MatInputModule,MatButtonModule,MatFormFieldModule,MatDatepickerModule],
  templateUrl: './add-employee-position.component.html',
  styleUrls: ['./add-employee-position.component.scss']
  ,standalone: true
})
export class AddEmployeePositionComponent implements OnInit {
  positionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEmployeePositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number },
    private formBuilder: FormBuilder,
    private employeePositionService: EmployeePositionService,
    public dialog: MatDialog
  ) {
    this.positionForm = this.formBuilder.group({
      positionId: ['', Validators.required],
      startDate: ['', Validators.required],
      isManagement: [false]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('submit');
    if (this.positionForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const newEmployeePosition: EmployeePosition = {
      employeeId: this.data.employeeId,
      positionId: this.positionForm.value.positionId,
      startDate: this.positionForm.value.startDate,
      isManagement: this.positionForm.value.isManagement,
    };

    // this.employeePositionService.addNewEmployeePosition(newEmployeePosition).subscribe(
    //   (response) => {
    //     console.log('Employee position added successfully:', response);
      
    //     this.dialogRef.close();
    //   },
    //   (error) => {
    //     console.error('Error adding employee position:', error);
     
    //   }
    // );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
