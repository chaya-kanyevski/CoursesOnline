import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses.service';
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CommonModule } from '@angular/common';
import { LessonManagementComponent } from "../lesson-management/lesson-management.component";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-management',
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    CourseDialogComponent,
    LessonManagementComponent
],
  templateUrl: './courses-management.component.html',
  styleUrl: './courses-management.component.css'
})

export class CoursesManagementComponent implements OnInit{

  courses : Course[] = []
  showDialog = false
  showLessonsDialog = false
  isEdid: boolean = false;
  selectedCourse : Course | null = null


  constructor(
    private coursesService : CoursesService,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('שגיאה בטעינת קורסים', err);
      }
    });
  }

  openCourseDialog(course?: Course) {
    this.selectedCourse = course || { title: '', description: '', teacherId: 0, isEnrolled: false };
    this.showDialog = true;
  }
  
  onCourseSubmit(course: Course) {
    if (!course.id) {
      this.coursesService.createCourse(course).subscribe({
        next: () => {
          this.loadCourses();
          this.closeDialog();
        },
        error: (err) => {
          console.error('שגיאה ביצירת קורס', err);
        }
      });
    } else {
      this.coursesService.updateCourse(course.id ,course).subscribe({
        next: () => {
          this.loadCourses();
          this.closeDialog();
        },
        error: (err) => {
          console.error('שגיאה בעדכון קורס', err);
        }
      });
    }
  }

  onEdit(course : Course){
    this.isEdid = true;
    this.openCourseDialog(course);
  }


  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId).subscribe(
      () => this.loadCourses()
    );
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedCourse = null;
    this.isEdid = false;
  }

  manageLessons(course : Course) {
    this.showLessonsDialog = true;
    this.selectedCourse = course;
  }

  closeLesonManagement() {
    this.showLessonsDialog = false;
    this.selectedCourse = null;
  }

}