import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

    private _authService = inject(AuthService);
 

}
