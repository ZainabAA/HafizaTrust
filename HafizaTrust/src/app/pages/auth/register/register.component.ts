import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        document.cookie = `token=${res.token}`
        this.router.navigate(['/']);
        console.log(res);
      },
      error: (error) => {
        console.error(error);
        
      }
    });
    console.log('Form Data:', this.registerForm.value);
  }
}
