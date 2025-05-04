import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorComponent],
  // imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('Form Data:', this.loginForm.value);
  }
}
