import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../models/Course';
import { Lesson } from '../../models/Lesson';
import { LessonsService } from '../../services/lessons.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-lesson-management',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './lesson-management.component.html',
  styleUrl: './lesson-management.component.css'
})
export class LessonManagementComponent implements OnInit{
    @Input() course! : Course 
    @Output() close = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    lessons : Lesson[] = []
    showAddDialog : boolean = false
    showUpdateDialog : boolean = false
    show : boolean = true
    newTitle : string | null = null
    newContent : string | null = null
    selectedLesson : Lesson | null = null

    constructor(
      private lessonsService : LessonsService
    ){ this.loadLessons()}

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons() {
    if (this.course && this.course.id) {
      this.lessonsService.getLessonsByCourse(this.course.id).subscribe(
        lessons => this.lessons = lessons,
        error => console.error('Error loading lessons:', error)
      );
      console.log(this.course);
    } else {
      console.error('Course is null or undefined');
    }
    console.log(this.lessons);
  }

  addLesson(){
    const lesson  : Lesson = {
      title: this.newTitle!, content: this.newContent || '',
      courseId: this.course.id!
    }
    this.lessonsService.createLesson(this.course.id!, lesson).subscribe({
      next: () => {
        this.loadLessons();
        this.closePopup();
      },
      error: (err) => {
        console.error('שגיאה ביצירת שיעור', err);
      }
    })
    this.showAddDialog = false
  }

  closePopup(){
      this.show = false
  }

  updateLesson(){
    const newLesson  : Lesson = {
      title: this.newTitle || this.selectedLesson!.title, content: this.newContent || this.selectedLesson!.content,
      courseId: this.course.id!
    }
    this.lessonsService.updateLesson(this.course.id!, this.selectedLesson!.id! ,newLesson).subscribe({
      next: () => {
        this.loadLessons();
        this.closePopup();
      },
      error: (err) => {
        console.error('שגיאה בעדכון השיעור', err);
      }
    })
    this.showUpdateDialog = false;
  }

  deleteLesson(lessonId: number) {
    this.lessonsService.deleteLesson(this.course.id!, lessonId).subscribe(
      () => this.loadLessons()
    );
  }

  openAddLessonDialog() {
    this.showAddDialog = true;
  }

  openUpdateLessonDialog(lesson : Lesson) {
    this.showUpdateDialog = true;
    this.selectedLesson = lesson;
  }

  onCancel() {
    this.showAddDialog = false
    this.showUpdateDialog = false
    this.cancel.emit();
  }
}