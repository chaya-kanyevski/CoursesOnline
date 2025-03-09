import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { AuthService } from './auth.service';
import { map, Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = '/api/courses';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllCourses(): Observable<Course[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Course[]>(this.baseUrl, { headers });
  }

  getCourseById(id: number): Observable<Course> {
    const headers = this.getAuthHeaders();
    return this.http.get<Course>(`${this.baseUrl}/${id}`, { headers });
  }

  createCourse(courseData: Course): Observable<Course> {
    const headers = this.getAuthHeaders();
    return this.http.post<Course>(this.baseUrl, courseData, { headers }).pipe(
      map(response => {
        console.log({...courseData}, response.id)
        return {
          ...courseData,
          id: response.id || null
        } as Course;
      })
    );
  }

  updateCourse(id: number, courseData: Course): Observable<Course> {
    const headers = this.getAuthHeaders();
    return this.http.put<Course>(`${this.baseUrl}/${id}`, courseData, { headers });
  }

  deleteCourse(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  joinCourse(courseId: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/${courseId}/enroll`, { userId }, { headers });
  }

  leaveCourse(courseId: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${courseId}/unenroll`, {
        headers,
        body: { userId } 
    });
  }

  getCoursesByStudentId(studentId: number): Observable<Course[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Course[]>(`${this.baseUrl}/student/${studentId}`, { headers });
  }
}