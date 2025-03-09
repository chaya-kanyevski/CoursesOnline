import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent{

    constructor(private router : Router){}

    onLogin() {
        this.router.navigate(['/login']);
    }
    
    onLogup() {
        this.router.navigate(['/logup']);
    }
}