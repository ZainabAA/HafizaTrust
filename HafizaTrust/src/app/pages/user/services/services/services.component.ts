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

  beneficiaries = [
    {
      "_id": "6661df625f25f11b001ca372",
      "username": "jsdhajksh",
      "image": "media/1717690210629pika-profile.png",
      "balance": 51108550.29999999
  },
  {
      "_id": "6661e0215f25f11b001ca378",
      "username": "admin",
      "balance": 317331,
      "image": "media/1730297010884steak.jfif"
  },
  {
      "_id": "6661e1085f25f11b001ca37c",
      "username": "admin1",
      "image": "media/1717690632855pika-profile.png",
      "balance": 17002
  },
  {
      "_id": "6661e1765f25f11b001ca380",
      "username": "admin123123132",
      "balance": 1873
  },
  {
      "_id": "6661e1fd5f25f11b001ca382",
      "username": "admin1adsljdhsajkd",
      "balance": 2545
  },
  {
      "_id": "6661e45b5f25f11b001ca384",
      "username": "admin1sdadsad",
      "balance": 1000
  },
  {
      "_id": "666314a55f25f11b001ca3ab",
      "username": "Aziz",
      "image": "media/1717769381756Emtiaz.jpg",
      "balance": 4820
  },
  {
      "_id": "666627c55f25f11b001ca42a",
      "username": "hamody",
      "image": "media/1717970885715Screenshot 2024-05-05 at 10.37.21â¯PM.png",
      "balance": 1350
  },
  {
      "_id": "6666b4d55f25f11b001ca45c",
      "username": "noor",
      "image": "media/1718007065099BUTTERFLY WING OPTICS.png",
      "balance": 620
  },
  {
      "_id": "6680a09e5f25f11b001ca49b",
      "username": "dddd",
      "image": "media/1719705758809photo123.PNG",
      "balance": 10000
  },
  {
      "_id": "6682c9335f25f11b001ca4b0",
      "username": "aldanaaa",
      "balance": 1102
  },
  {
      "_id": "6692d5c15f25f11b001ca4e3",
      "username": "freshPrincess",
      "image": "media/1720901565339Money income amico.png",
      "balance": 31
  },
  {
      "_id": "66d663955f25f11b001ca626",
      "image": "media/1725326229212R.png",
      "balance": 0
  },
  {
    "_id": "6811d618a5fbc8dfe6a92486",
    "username": "zainab",
    "balance": 50
  },{
    "username": "heba",
    "image": "media/1730377698282qrcode_s.esheaq.onl.png",
    "balance": 199100
}
  ]

  constructor(){
     this._userService.getCurrent().subscribe((res)=>{
        this.user = res;
        console.log(res);
    })
  }
  transferInput = [
    {dataName: 'username',
      dataType: 'select',
      options: this.beneficiaries.map(b => b.username),
      data: this.transferUsername()
    },
    {dataName: 'amount',
      dataType: 'number',
      data: this.transferAmount()
    }
  ]

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
