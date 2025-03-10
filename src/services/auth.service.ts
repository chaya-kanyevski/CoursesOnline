import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Role, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/auth';
  private currentUserRole : Role | null = null
  private currentUserId : number | null = null
  private currentUser : User | null = null  
  
  constructor(private http: HttpClient) {  this.loadCurrentUser(); }

  logup(credentials: {
    email: string, 
    password: string
  }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/register`, credentials, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.setCurrentUser(response);
          this.currentUserId = response.userId
          this.currentUserRole = response.role;
        }
      }),
      catchError(error => {
        console.error('Logup error details:', error);
        return throwError(() => new Error('Logup failed. Please try again.'));
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/login`, credentials, { headers }).pipe(
      tap((response: any) => {
        console.log('response in login service: ',response)
        if (response.token) {
          this.setToken(response.token);
          this.setCurrentUser(response);
          this.currentUserId = response.userId
          this.currentUserRole = response.role;
        }
      }),
      catchError(error => {
        console.error('Login error details:', error);
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Response body:', error.error);
        }
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );

  }
  

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

    setCurrentUser(user: User) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user)); 
    }

    loadCurrentUser() {
      const userData = localStorage.getItem('currentUser'); 
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }

    getUserRole() {
    console.log(this.currentUserRole)
    return this.currentUserRole;
  }

  getUserId() {
    return this.currentUserId;
  }
}