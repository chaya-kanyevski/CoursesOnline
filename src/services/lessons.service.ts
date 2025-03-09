import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Lesson } from '../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private baseUrl = "/api/courses"

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

  getLessonsByCourse(courseId: number): Observable<Lesson[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Lesson[]>(`${this.baseUrl}/${courseId}/lessons`, { headers });
  }

  getLessonById(courseId: number, lessonId: number): Observable<Lesson> {
    const headers = this.getAuthHeaders();
    return this.http.get<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  createLesson(courseId: number, lessonData: Lesson): Observable<Lesson> {
    const headers = this.getAuthHeaders();
    return this.http.post<Lesson>(`${this.baseUrl}/${courseId}/lessons`, lessonData, { headers });
  }

  updateLesson(courseId: number, lessonId: number, lessonData: Lesson): Observable<Lesson> {
    const headers = this.getAuthHeaders();
    return this.http.put<Lesson>(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, lessonData, { headers });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
}