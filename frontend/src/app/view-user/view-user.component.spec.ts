import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUserComponent } from './view-user.component';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUserComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TableModule,
        ButtonModule,
        PaginatorModule
      ],
      providers: [
        ConfirmationService,
        MessageService,
        {
          provide: UserService,
          useValue: {
            getAllUsers: () => of({ results: [{ id: 1, name: 'John', gender: 'Male', email: 'john@example.com' }], count: 1 }),
            getUsers: () => of([{ id: 1, name: 'John', gender: 'Male', email: 'john@example.com' }]),
            deleteUser: (id: number) => of({})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all users on init', () => {
    spyOn(userService, 'getAllUsers').and.callThrough();
    component.ngOnInit();
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(component.usersDataSource.length).toBe(1);
    expect(component.totalUsers).toBe(1);
  });

  it('should apply search filter', () => {
    spyOn(component, 'getAllUsers').and.callThrough();
    component.applySearchFilter();
    expect(component.pageIndex).toBe(0);
    expect(component.getAllUsers).toHaveBeenCalled();
  });

  it('should handle page change', () => {
    spyOn(component, 'getAllUsers').and.callThrough();
    component.onPageChange({ page: 1 });
    expect(component.pageIndex).toBe(1);
    expect(component.getAllUsers).toHaveBeenCalled();
  });

  it('should delete a user', () => {
    spyOn(userService, 'deleteUser').and.callThrough();
    spyOn(component, 'getAllUsers').and.callThrough();
    component.deleteUser(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(component.getAllUsers).toHaveBeenCalled();
  });

});
