import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:3000/api/users";

  constructor(
    private http : HttpClient,
    private authService : AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(this.baseUrl, { headers });
  }

  getUserById(id: number): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.baseUrl}/${id}`, { headers });
  }

  createUser(userData: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(this.baseUrl, userData, { headers });
  }

  updateUser(id: number, userData: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.baseUrl}/${id}`, userData, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

}
