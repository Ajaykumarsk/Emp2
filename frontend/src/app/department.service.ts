// department.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './department.interface'; // Import the Department interface

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl ='http://127.0.0.1:8000/api/departments/'; 

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartmentById(departmentId: number): Observable<Department> {
    const url = `${this.apiUrl}/${departmentId}`;
    return this.http.get<Department>(url);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    const url = `${this.apiUrl}/${department.id}`;
    return this.http.put<Department>(url, department);
  }

  deleteDepartment(departmentId: number): Observable<void> {
    const url = `${this.apiUrl}${departmentId}`;
    return this.http.delete<void>(url);
  }
}
