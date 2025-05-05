import { Component, EventEmitter, Output } from '@angular/core';
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
  selectedImage: File | null = null;
  @Output() closed = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      image: [''],
      // image: ['', [Validators.required]]
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
      // You can now send this file to FormData or preview it
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
