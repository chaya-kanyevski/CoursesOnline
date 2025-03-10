import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logup',
  imports: [ReactiveFormsModule],
  templateUrl: './logup.component.html',
  styleUrl: './logup.component.css'
})
export class LogupComponent implements OnInit{

    loginForm : FormGroup | any;
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      private router : Router
    ){}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        name: [''],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', Validators.required]
        })
    }

    get f(): { [key: string]: AbstractControl } {
      return this.loginForm.controls;
    }

    onSubmit() : void{
      if (this.loginForm.valid){
        this.authService.logup(this.loginForm.value).subscribe({
          next: (response) => {
            console.log('Logup successful!');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/courses-list']);
          },
          error: (error) => {
            console.error('Logup faild!', error);
          }
        });
      }
    }
}

