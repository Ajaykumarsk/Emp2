import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ViewUserComponent implements OnInit {
  usersDataSource: User[] = [];
  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10]; // Define desired page size options
  users: number = 0;
  searchQuery: string = '';
  loading: boolean = true;
  @ViewChild('dt') table!: Table;
  @ViewChild('p') paginator!: Paginator;
  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.getAllUsers();
    this.getUsersCount();
    this.loading = false;
  }

  applySearchFilter(): void {
    this.pageIndex = 0; // Reset pageIndex when performing a new search
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers(this.pageIndex + 1, this.pageSize, this.searchQuery).subscribe({
      next: (data: any) => {
        this.usersDataSource = data.results;
        this.totalUsers = data.count;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
      }
    });
  }

  getUsersCount(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.length;
        this.maleUsers = users.filter(user => user.gender === 'Male').length;
        this.femaleUsers = users.filter(user => user.gender === 'Female').length;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
      }
    });
  }
  
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.getAllUsers(); // Refresh user list after deletion
      },
      error: (error) => {
        console.error('Failed to delete user:', error);
      }
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.page;
    this.getAllUsers();
  }

  confirm(event: Event, userId: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Please confirm to delete the record',
      icon: 'pi pi-exclamation-circle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        this.deleteUser(userId);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  clear(table: Table): void {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  download(): void {
    const fileUrl = 'http://127.0.0.1:8000/api/download-users-excel/';
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = fileUrl;
    anchor.download = 'User-Data';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}
