import { Component, inject, Input, model } from '@angular/core';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

interface InputType {
  dataName: string;
  dataType: 'select' | 'text' | 'number';
  options?: string[];
  data: any
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent<T> {
  readonly dialogRef = inject(MatDialogRef<ModalComponent<T>>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly inputModel = model(this.data);
  // @Input() dataInputTypes!: InputType[];
  ;

  constructor() {
    console.log(this.inputModel);
    
  }
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
  // readonly amount = model(this.data.amount);
  // readonly username = model(this.data.username);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
