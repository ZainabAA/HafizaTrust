import {ViewChild, AfterViewInit, Component, effect, inject, signal} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user/user.service';
import { User } from '../../data/user';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usersService = inject(UserService);
  usersData = signal<User[]>([]);
  dataSource = new MatTableDataSource<User>([]);

  usersEffect = effect(() => {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.usersData.set(res);
        this.dataSource = new MatTableDataSource<User>(this.usersData());
        this.dataSource.paginator = this.paginator;
      }
    })
  })
  
  isImageError = false;
  displayedColumns: string[] = ['id', 'username', 'balance', 'image'];

}
