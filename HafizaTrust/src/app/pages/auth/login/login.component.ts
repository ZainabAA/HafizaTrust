import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  private _authService = inject(AuthService);
  private router = inject(Router)

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    
    this._authService.login(this.loginForm.value).subscribe(res=>{
<<<<<<< HEAD

      this.router.navigateByUrl('/user')
=======
      document.cookie = `token=${res.token}`
      document.cookie = `username=${this.loginForm.get('username')?.value}`;
      this.router.navigate(['/admin']);
      console.log(res);
>>>>>>> d80c13aeaca6c94d35502b6cdf60cb83d8394677
    })
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
