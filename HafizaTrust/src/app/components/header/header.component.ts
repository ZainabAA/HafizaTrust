import { Component, effect, inject, model, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
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
  private router = inject(Router);
  private _authService = inject(AuthService);
  user: User | null = null;
  usersService = inject(UserService);
  readonly dialog = inject(MatDialog);

  usersEffect = effect(() => {
    if(this._authService.$userToken() != null) {
      console.log(this._authService.$userToken());
      
      this.usersService.getCurrent().subscribe({
        next: (res) => {  
            console.log(res);
            this.user = res;
          }
      })
    }
    else
      this.user = null
  })
  
  goHome()
  {
    const route = localStorage.getItem('homeRoute') || '/user'; // fallback route
    this.router.navigateByUrl(route);
  }

  logout()
  {
    localStorage.removeItem('homeRoute');
    this._authService.logout()
  }

}
