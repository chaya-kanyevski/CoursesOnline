import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { LoginComponent } from '../components/login/login.component';
import { LogupComponent } from '../components/logup/logup.component';
import { CoursesListComponent } from '../components/courses-list/courses-list.component';
import { CoursesManagementComponent } from '../components/courses-management/courses-management.component';
import { CourseDialogComponent } from '../components/course-dialog/course-dialog.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { AccessGuard } from '../gurds/access.guard';
import { AccessDeniedComponent } from '../components/access-denied/access-denied.component';
export const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logup', component: LogupComponent},
    {path: 'courses-list', component: CoursesListComponent},
    {path: 'course-management', component: CoursesManagementComponent, canActivate: [AccessGuard]},
    {path: 'course-dialog', component: CourseDialogComponent},
    {path: 'courses/:id', component: CourseDetailsComponent},
    {path: 'access-denied', component: AccessDeniedComponent },
];

