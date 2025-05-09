import { Component, inject, model, signal } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from '../../../../components/modal/modal/modal.component';
import { InputType } from '../../../../components/modal/modal/modal.component';
import { TransactionsService } from '../../../../services/transactions/transactions.service';
import { PopupService } from '../../../../services/popup/popup.service';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatGridListModule, RouterModule,
    MatButtonModule,
    // MatDialogTitle,
    // MatDialogContent,
    // MatDialogActions,
    // MatDialogClose
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  readonly transferAmount = model(0);
  readonly transferUsername = model('');
  readonly withdrawAmount = model(0);
  readonly dialog = inject(MatDialog);
  private _popupService = inject(PopupService);
  private _userService = inject(UserService);
  transactionsService = inject(TransactionsService);
   user: User = {
     username: '',
     image: '',
     balance: 0,
     _id: ''
   };

  constructor(){
     this._userService.getCurrent().subscribe((res)=>{
        this.user = res;
        console.log(res);
    })
  }

  withdrawnput = [
    {
      dataName: 'amount',
      dataType: 'number',
      data: this.withdrawAmount(),
    }
  ]

  transfer(beneficiary: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: [
        {
          dataName: 'amount',
          dataType: 'number',
          data: this.transferAmount()
        }
      ]
    });
  
    dialogRef.afterClosed().subscribe((result: InputType[]) => {
      if (result !== undefined) {
        let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
  
        this.transferAmount.set(amountRes);
  
        this.transactionsService.transfer(this.transferAmount(), beneficiary.username)

        if(this.transferAmount() > this.user.balance)
        {
            this._popupService.toast("Insufficient balance!", false)
        }else{
          this.transactionsService.transfer(this.transferAmount(), this.transferUsername())
          .subscribe({
            next: (res) => {
              this._popupService.toast("Transfer completed!")

              this.transferAmount.set(0);
            },
            error: (error) => {
              console.log(error);
              this._popupService.toast("Transfer failed!", false)

            }
          });
        }
          
        
      }
    });
  }

  withdraw() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.withdrawnput,

    });

    dialogRef.afterClosed().subscribe((result: InputType[]) => {
      if (result !== undefined) {
        let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
        
        this.withdrawAmount.set(amountRes);
        if(this.withdrawAmount() > this.user.balance )
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
