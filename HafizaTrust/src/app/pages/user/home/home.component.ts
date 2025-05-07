import { Component, effect, inject, signal, model } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { getToken } from '../../../interceptors/auth.interceptor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  usersService = inject(UserService);
  user = signal<User | null>(null);
  username = signal<string | null>('');

  constructor() {
    this.username.set(getToken('username'));
    if(this.username()){
      this.usersService.getCurrent().subscribe({
        next: (res) => {  
            this.user.set(res)
          }
      })
    }
  }
}
