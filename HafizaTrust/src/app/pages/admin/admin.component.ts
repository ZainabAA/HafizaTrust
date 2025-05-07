import {ViewChild, AfterViewInit, Component, effect, 
  inject, signal, model} from '@angular/core';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { UserService } from '../../services/user/user.service';
import { User } from '../../data/user';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { InputType, ModalComponent } from '../../components/modal/modal/modal.component';
import { PopupService } from '../../services/popup/popup.service';
import { Router } from '@angular/router';

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

  readonly depositAmount = model(0);
  readonly dialog = inject(MatDialog);
  private _popupService = inject(PopupService);
  private _router = inject(Router)

  transactionsService = inject(TransactionsService);
  depositInput = [
    {
      dataName: 'amount',
      dataType: 'number',
      data: this.depositAmount()
    }
  ]
  displayedColumns: string[] = ['id', 'username', 'balance', 'Action'];

  usersEffect = effect(() => {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.usersData.set(res);
        this.dataSource = new MatTableDataSource<User>(this.usersData());
        this.dataSource.paginator = this.paginator;
      }
    })
  })

  deposit() {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: this.depositInput,
      });
  
      dialogRef.afterClosed().subscribe((result: InputType[]) => {
        console.log('The dialog was closed');
        if (result !== undefined) {
          let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
          this.depositAmount.set(amountRes);
          
          this.transactionsService.deposit(this.depositAmount())
            .subscribe({
              next: (res) => {
                this.depositAmount.set(0);
                console.log(res);
                this._popupService.toast("Deposit successful", true)
              },
              error: (error) => {
                this._popupService.toast("Transaction failed", false)
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
