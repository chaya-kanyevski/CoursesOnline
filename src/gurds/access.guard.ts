import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log(this.authService.getUserRole())
    const userRole = this.authService.getUserRole();
    console.log("in guard", userRole === 'teacher')
    console.log("in guard", userRole)   
    if (userRole === 'teacher') {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
