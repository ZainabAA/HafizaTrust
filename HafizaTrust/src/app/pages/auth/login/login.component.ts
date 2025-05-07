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
import { Router, RouterModule } from '@angular/router';
import { PopupService } from '../../../services/popup/popup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  private _authService = inject(AuthService);
  private router = inject(Router)
  private _popupService = inject(PopupService);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    
    this._authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        
        this._popupService.toast("Login successful!")
        document.cookie = `token=${res.token}`
        document.cookie = `username=${this.loginForm.get('username')?.value}`;
        console.log(document.cookie);
        
        this.router.navigate(['/admin']);
      },
      error:(err)=>{
          this._popupService.toast("Login failed", false)
      }
      
    })
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
