import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePositionComponent } from './add-employee-position.component';

describe('AddEmployeePositionComponent', () => {
  let component: AddEmployeePositionComponent;
  let fixture: ComponentFixture<AddEmployeePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeePositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
