import { Component, inject, model, signal } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from '../../../../components/modal/modal/modal.component';
import { InputType } from '../../../../components/modal/modal/modal.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatGridListModule, RouterModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  readonly transferAmount = model(0);
  readonly transferUsername = model('');
  readonly withdrawAmount = model(0);
  readonly dialog = inject(MatDialog);

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
  ]

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
      data: this.withdrawAmount()
    }
  ]

  transfer(){
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.transferInput,
    });

    dialogRef.afterClosed().subscribe((result: InputType[]) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        let usernameRes = result.filter(data => data.dataName === 'username')[0].data;
        let amountRes = result.filter(data => data.dataName === 'amount')[0].data;

        this.transferAmount.set(amountRes);
        this.transferUsername.set(usernameRes)
      }
    });
  }

  withdraw() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: this.withdrawnput,
    });

    dialogRef.afterClosed().subscribe((result: InputType[]) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        let amountRes = result.filter(data => data.dataName === 'amount')[0].data;
        this.withdrawAmount.set(amountRes);
        
      }
    });
  }
}
