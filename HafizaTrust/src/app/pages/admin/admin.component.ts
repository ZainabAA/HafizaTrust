import {ViewChild, AfterViewInit, Component, effect, 
  inject, signal, model} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { InputType, ModalComponent } from '../../components/modal/modal/modal.component';
import { PopupService } from '../../services/popup/popup.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  usersService = inject(UserService);
  authService = inject(AuthService);
  usersData = signal<User[]>([]);
  dataSource = new MatTableDataSource<User>([]);

  readonly depositAmount = model(0);
  readonly depositUsername = model('');
  readonly depositPassword = model('');
  readonly dialog = inject(MatDialog);
  private _popupService = inject(PopupService);
  private _router = inject(Router)

  transactionsService = inject(TransactionsService);


  searchForm = new FormControl<string | null>(null);
  depositInput = [
    {
    dataName: 'username',
    dataType: 'text',
    data: this.depositUsername()
    },
    {
    dataName: 'password',
    dataType: 'password',
    data: this.depositPassword()
  },
    {
      dataName: 'amount',
      dataType: 'number',
      data: this.depositAmount()
    }
  ]
  displayedColumns: string[] = ['id', 'username', 'balance', 'action'];

  usersEffect = effect(() => {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.usersData.set(res);
        this.dataSource = new MatTableDataSource<User>(this.usersData());
        this.dataSource.paginator = this.paginator;
      }
    })
  })

  applySearch() {
    if (!this.searchForm.value) {
      this.dataSource.data = this.usersData();
      return;
    }
    console.log(this.usersData()[0]._id.includes(this.searchForm.value ?? ''));
    
    this.dataSource.data = this.usersData().filter((usrs) =>
      (usrs.username?.includes(this.searchForm.value ?? '')
      || usrs._id?.includes(this.searchForm.value ?? ''))
    );
  }

  deposit() {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: this.depositInput,
      });
  
      dialogRef.afterClosed().subscribe((result: InputType[]) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
          this.depositAmount.set(amountRes);
          let userRes = result.filter(data => data.dataName === 'username')[0].data;
          this.depositUsername.set(userRes);
          let passwordRes = result.filter(data => data.dataName === 'password')[0].data;
          this.depositPassword.set(passwordRes);
          
          let userToken: string | null = null;
          console.log(userRes, passwordRes);
          
          this.authService.login({username: userRes, password: passwordRes}).subscribe({
            next: (res) => {
              userToken = res.token;
              console.log(userToken);
              this.transactionsService.deposit(this.depositAmount(), userToken)
              .subscribe({
                next: (res) => {
                  this.depositAmount.set(0);
                  console.log(res);
                  this._popupService.toast("Deposit successful", true)
                },
                error: (error) => {
                  this._popupService.toast("Deposit failed", false)
                }
              });
            },
            error: (error) => {
              this._popupService.toast("Incorrect username/password", false)
            }
          });
        }
      });
    }

    logout()
  {
    document.cookie = "";
    document.cookie.replace('token', '');
    document.cookie.replace('username', '')
    console.log(document.cookie);
    
    this._router.navigateByUrl('/')
    
  }
}
