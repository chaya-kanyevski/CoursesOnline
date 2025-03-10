import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../models/Course';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialog',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.css'
})
export class CourseDialogComponent{
  @Input() course: Course = { title: '', description: '', teacherId: 0, isEnrolled: false }; 
  @Input() isEdid! : boolean;
  @Output() courseSubmit = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter<void>();

  newTitle: string = ''
  newDescription: string = ''

  onSubmit() {
    this.course.title = this.newTitle;
    this.course.description = this.newDescription;
    this.courseSubmit.emit(this.course!);
    this.cancel.emit();
  }  

  onCancel() {
    this.cancel.emit();
  }
}