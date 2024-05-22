import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  displayDialog: boolean = false;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  showDialog(): void {
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  addDepartment(): void {
    if (this.departmentForm.valid) {
      const newDepartment = this.departmentForm.value;
      this.departmentService.createDepartment(newDepartment).pipe(
        tap(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department added' });
        }),
        catchError(error => {
          console.error('Failed to add department:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add department' });
          return of(null);
        }),
        finalize(() => {
          this.getDepartments();
          this.hideDialog();
        })
      ).subscribe();
    }
  }

  getDepartments(): void {
    this.departmentService.getDepartments().pipe(
      tap(data => {
        this.departments = data;
      }),
      catchError(error => {
        console.error('Failed to fetch departments:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch departments' });
        return of([]);
      })
    ).subscribe();
  }

  confirm(event: Event, departmentId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this department?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.departmentService.deleteDepartment(departmentId).pipe(
          tap(() => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department deleted' });
          }),
          catchError(error => {
            console.error('Failed to delete department:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete department' });
            return of(null);
          }),
          finalize(() => {
            this.getDepartments();
          })
        ).subscribe();
      }
    });
  }
}
