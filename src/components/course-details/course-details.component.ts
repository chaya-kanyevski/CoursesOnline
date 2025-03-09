import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/Course';
import { Lesson } from '../../models/Lesson';
import { CoursesService } from '../../services/courses.service';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-course-details',
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  @Input() course : Course | null = null
  lessons: Lesson[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private lessonsService : LessonsService
  ) {this.loadLessons()}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourseDetails(+courseId);
    }
  }

  loadCourseDetails(courseId: number) {
    this.coursesService.getCourseById(courseId).subscribe(course => {
      this.course = course;
      this.loadLessons();
    });
  }

  loadLessons() {
    this.lessonsService.getLessonsByCourse(this.course?.id!).subscribe(lessons => {
      this.lessons = lessons;
    });
  }
}
