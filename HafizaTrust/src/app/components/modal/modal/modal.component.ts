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
import { CommonModule, TitleCasePipe } from '@angular/common';

export interface InputType {
  dataName: string;
  dataType: 'select' | 'text' | 'number' | 'password';
  options?: string[];
  data: any
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule,
    // MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    MatDialogClose, MatFormFieldModule, FormsModule, MatInputModule, TitleCasePipe],
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
    console.log(this.inputModel());
  }
  // readonly amount = model(this.data.amount);
  // readonly username = model(this.data.username);

  isFormInvalid(): boolean {
    return this.inputModel().some((i: InputType) =>
      i.data === '' ||
      i.data === null ||
      (i.dataName === 'amount' && i.data < 0)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
