// location.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './location.interface'; // Import the Location interface

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://127.0.0.1:8000/api/locations/'; 

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  getLocationById(locationId: number): Observable<Location> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.http.get<Location>(url);
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location);
  }

  updateLocation(location: Location): Observable<Location> {
    const url = `${this.apiUrl}/${location.id}`;
    return this.http.put<Location>(url, location);
  }

  deleteLocation(locationId: number): Observable<void> {
    const url = `${this.apiUrl}/${locationId}`;
    return this.http.delete<void>(url);
  }
}
