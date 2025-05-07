import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { getToken } from '../../guards/auth.guard';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  username: string = '';

  ngOnInit(): void {
    const username = getToken('username');
    this.username = username || ' ';
  }
  logout()
  {
    this._authService.logout()
  }

}
