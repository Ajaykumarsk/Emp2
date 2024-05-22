import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentComponent } from './department.component';
import { DepartmentService } from '../department.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        TableModule,
        BrowserAnimationsModule,
        ButtonModule,
        DialogModule,
        ToastModule,
        ConfirmPopupModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: DepartmentService,
          useValue: {
            getDepartments: () => of([{ id: 1, name: 'Department 1' }, { id: 2, name: 'Department 2' }])
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render department form with input field and buttons', () => {
    const compiled = fixture.nativeElement;
    component.showDialog();
    fixture.detectChanges();

    // Check if form exists
    expect(compiled.querySelector('form')).toBeTruthy();

    // Check if input field exists
    const inputElement = compiled.querySelector('input[formControlName="departmentName"]');
    expect(inputElement).toBeTruthy();

    // Check if Add button exists
    const addButton = compiled.querySelector('p-button[label="Add"]');
    expect(addButton).toBeTruthy();

    // Check if Cancel button exists
    const cancelButton = compiled.querySelector('p-button[label="Cancel"]');
    expect(cancelButton).toBeTruthy();
  });

  it('should render department list', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('table tbody tr').length).toBe(2); // Assuming two departments are fetched
  });

  it('should render department actions', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('table tbody tr td button').length).toBe(4); // Assuming two departments are fetched
  });

  it('should add department on form submit', () => {
    component.showDialog();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    // Fill the form
    const inputElement = compiled.querySelector('input[formControlName="departmentName"]');
    inputElement.value = 'New Department';
    inputElement.dispatchEvent(new Event('input'));

    // Submit the form
    const formElement = compiled.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    fixture.detectChanges();

    // Check if department is added
    expect(component.departments.length).toBe(3); // Assuming one new department is added
    expect(component.departments[2].name).toBe('New Department');
  });

  it('should delete department on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.confirm(new Event('click'), 1);
    fixture.detectChanges();

    // Check if department is deleted
    expect(component.departments.length).toBe(2); // Assuming one department is deleted
  });
});
