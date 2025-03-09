import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

    loginForm : FormGroup | any;
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      private router : Router
    ){}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]]
        })
    }

    get f(): { [key: string]: AbstractControl } {
      return this.loginForm.controls;
    }

    onSubmit() : void{
      if (this.loginForm.valid){
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            this.authService.setCurrentUser(response);
            console.log('Login successful!', response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/courses-list']);
          },
          error: (error) => {
            console.error('Login faild!', error);
          }
        });
      }
    }
}
