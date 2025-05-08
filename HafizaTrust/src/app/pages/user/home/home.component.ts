import { Component, effect, inject, signal, model } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { getToken } from '../../../interceptors/auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { InputType, ModalComponent } from '../../../components/modal/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupService } from '../../../services/popup/popup.service';
import { TransactionsService } from '../../../services/transactions/transactions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  usersService = inject(UserService);
  user = signal<User | null>(null);
  username = signal<string | null>('');

  readonly withdrawAmount = model(0);
  readonly dialog = inject(MatDialog);
  private _popupService = inject(PopupService);
    transactionsService = inject(TransactionsService);

  withdrawnput = [
    {
      dataName: 'amount',
      dataType: 'number',
      data: this.withdrawAmount(),
    }
  ]

  constructor() {
    this.username.set(getToken('username'));
    if(this.username()){
      this.usersService.getCurrent().subscribe({
        next: (res) => {
            console.log(res);
            
            this.user.set(res)
          }
      })
    }
  }

   withdraw() {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: this.withdrawnput,
  
      });
  
      dialogRef.afterClosed().subscribe((result: InputType[]) => {
        if (result !== undefined) {
          let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
          
          this.withdrawAmount.set(amountRes);
          if(this.withdrawAmount() > (this.user()?.balance ?? 0 ))
          {
            this._popupService.toast("Insufficient balance!", false);
          }
          else{
            
            this.transactionsService.withdraw(this.withdrawAmount())
            .subscribe({
              next: (res) => {
                this.withdrawAmount.set(0);
                console.log(res);
                this._popupService.toast("Withdrawal succeeded!");
                
                  this.usersService.getCurrent().subscribe({
                    next: (res) => {
                        console.log(res);
                        
                        this.user.set(res)
                      }
                  })
              },
              error: (error) => {
                this._popupService.toast("Withdrawal failed!", false)
  
                console.log(error);
              }
            });
          }
          
          
        }
      });
    }
}
