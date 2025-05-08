import { Component, effect, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { getToken } from '../../guards/auth.guard';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  private router = inject(Router);
  private usersService = inject(UserService);
  private dialog = inject(MatDialog);

  user = signal<User | null>(null);
  username = signal<string | null>(null);
  readonly image = model('');
  isLoggedIn = signal<boolean>(false);

  constructor() {
    const token = getToken('token');
    this.isLoggedIn.set(!!token);

    const storedUsername = getToken('username');
    this.username.set(storedUsername);

    if (storedUsername) {
      this.usersService.getCurrent().subscribe({
        next: (res) => {
          this.user.set(res);
          this.image.set(res.image ?? '');
        },
        error: (err) => console.error('Failed to fetch user', err)
      });
    }
  }

  usersEffect = effect(() => {
    if (this.user()?.image) {
      this.image.set(this.user()?.image ?? '');
    }
  });

  goHome() {
    const route = localStorage.getItem('homeRoute') || '/user/home';
    this.router.navigateByUrl(route);
  }

  logout() {
    localStorage.removeItem('homeRoute');
    this._authService.logout();
  }
}
