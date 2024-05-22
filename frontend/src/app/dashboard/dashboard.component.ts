import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DepartmentService } from '../department.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  maleUsers: number = 0;
  femaleUsers: number = 0;
  totalDepartments: number = 0;
  totalLocations: number = 0;

  constructor(
    private userService: UserService,
    private departmentService: DepartmentService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getUserStatistics();
  }

  getUserStatistics(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.totalUsers = users.length;
        this.maleUsers = users.filter((user) => user.gender === 'Male').length;
        this.femaleUsers = users.filter((user) => user.gender === 'Female').length;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
        // Handle the error appropriately (e.g., show a message to the user)
      }
    });

    this.departmentService.getDepartments().subscribe({
      next: (departments) => {
        this.totalDepartments = departments.length;
      },
      error: (error) => {
        console.error('Failed to fetch departments:', error);
        // Handle the error appropriately (e.g., show a message to the user)
      }
    });

    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.totalLocations = locations.length;
      },
      error: (error) => {
        console.error('Failed to fetch locations:', error);
        // Handle the error appropriately (e.g., show a message to the user)
      }
    });
  }
}
