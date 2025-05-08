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
  user = signal<User | null>(null);
  username1: string = '';
  usersService = inject(UserService);
    username = signal<string | null>('');
    readonly image = model('');
    readonly dialog = inject(MatDialog);

  constructor() {
    this.username.set(getToken('username'));
    if(this.username()){
      this.usersService.getCurrent().subscribe({
        next: (res) => {  
            this.user.set(res)
            this.image.set(this.user()?.image ?? '')
          }
      })
    }
  }
  
  ngOnInit(): void {
    const username = getToken('username');
    this.username1 = username || ' ';
  }

  usersEffect = effect(() => {
    console.log(this.user());
    if(this.user()?.image){
      this.image.set(this.user()?.image ?? '');
    }
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
