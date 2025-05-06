import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _authService = inject(AuthService);


  logout()
  {
    this._authService.logout()
  }

}
