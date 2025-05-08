import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from "./components/loader/loader.component";
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatIconModule, HeaderComponent, LoaderComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HafizaTrust';
  sidenavTrigger = signal<boolean>(false);

  toggle(val: boolean)
  {
    this.sidenavTrigger.set(val)
  }
}
