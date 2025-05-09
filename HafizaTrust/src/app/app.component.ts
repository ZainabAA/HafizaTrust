import { Component, effect, inject, model, output, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from "./components/loader/loader.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { User } from './interfaces/user';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';


interface MenuNode {
  name: string;
  children?: MenuNode[];
  route?: string;
}

const TREE_DATA: MenuNode[] = [
  {
    name: 'Services',
    children: [ {name: 'Transactions', route: '/user/transactions'}, {name: 'Beneficiaries', route:'user/beneficiaries'}],
  }]
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  route?:string;
  level: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatIconModule, HeaderComponent, LoaderComponent, MatSidenavModule, RouterLink, MatButtonModule,MatTreeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HafizaTrust';
  sidenavTrigger = signal<boolean>(false);
user: User | null = null;
  private usersService = inject(UserService);
  private _authService = inject(AuthService)
    username = signal<string | null>('');
    readonly image = model('');
    readonly dialog = inject(MatDialog);
    sidenavEvent = output<boolean>();
    showFiller = false;

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
  toggle(val: boolean)
  {
    this.sidenavTrigger.set(val)
  }

  /*
  Tree code
   */
  private _transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
     level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
