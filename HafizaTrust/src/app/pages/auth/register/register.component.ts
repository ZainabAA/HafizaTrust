import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PopupService } from '../../../services/popup/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  selectedImage: File | null = null;
  @Output() closed = new EventEmitter<void>();

  private _popupService = inject(PopupService);
  private _authService = inject(AuthService);
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      image: [''],
      // image: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.registerForm.get('username')?.value);
    formData.append('password', this.registerForm.get('password')?.value);
  
    if (this.registerForm.get('image')?.valid) {
      formData.append('image', this.registerForm.get('image')?.value);
    }
  
    this.authService.register(formData).subscribe({
      next: (res) => {
        this._popupService.toast("Register successful!")
        document.cookie = `token=${res.token}`
        document.cookie = `username=${this.registerForm.get('username')?.value}`;
        this._authService.setUser();
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this._popupService.toast("Registeration failed", false)
        console.error(err);
      },
    });
    console.log('Form Data:', this.registerForm.value);
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

      if (!allowedTypes.includes(file.type)) {
        alert('Invalid image type. Only PNG, JPG, JPEG, WEBP are allowed.');
        return;
      }

      this.selectedImage = file;
      console.log('Selected image:', this.selectedImage);
    }
  }

  closeModal() {
    this.closed.emit();
  }

  navigateToHome() {
    this.router.navigate(['/main']);
  }
}
