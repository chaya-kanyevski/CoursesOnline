import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses-list',
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit{
    courses : Course[] = []

    constructor(
      private coursesService : CoursesService,
      private authService : AuthService
    ){}
    
  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    const userId = this.authService.getUserId();
    if (userId) {
        this.coursesService.getAllCourses().subscribe({
            next: (allCourses) => {
                this.coursesService.getCoursesByStudentId(userId).subscribe({
                    next: (enrolledCourses) => {
                        const enrolledCourseIds = enrolledCourses.map(course => course.id);
                        this.courses = allCourses.map(course => ({
                            ...course,
                            isEnrolled: enrolledCourseIds.includes(course.id)
                        }));
                    },
                    error: (error) => {
                        console.error('Failed to load enrolled courses', error);
                    }
                });
            },
            error: (error) => {
                console.error('Failed to load all courses', error);
            }
        });
    } else {
        console.error('User is not logged in or user ID is not available.');
    }
}

  enroledCourses() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.coursesService.getCoursesByStudentId(userId).subscribe({
        next: (courses) => {
          this.courses = courses.map(course => ({
            ...course,
            isEnrolled: true
          }));
        },
        error: (error) => {
          console.error('Failed to load courses', error);
        }
      });
    } else {
      console.error('User is not logged in or user ID is not available.');
    }
  }

  joinCourse(courseId: number){
    const userId = this.authService.getUserId();
    if (userId) { 
      console.log(userId)
      this.coursesService.joinCourse(courseId, userId).subscribe(response => {
        console.log(response.message);
        this.loadCourses(); 
      });
    } else {
      console.error('User is not logged in or user ID is not available.');
    }
  }

  leaveCourse(courseId: number){
    const userId = this.authService.getUserId();
    if (userId) { 
      console.log(userId)
      this.coursesService.leaveCourse(courseId, userId).subscribe(response => {
        console.log(response.message);
        this.loadCourses(); 
      });
    } else {
      console.error('User is not logged in or user ID is not available.');
    }
  }

  isStudent() {
    return this.authService.getUserRole() === 'student';
}
}
