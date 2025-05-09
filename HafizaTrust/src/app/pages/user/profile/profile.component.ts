import { Component, effect, inject, signal, model } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User, UserUpdateResponse } from '../../../interfaces/user';
import { InputType, ModalComponent } from '../../../components/modal/modal/modal.component';
import { MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PopupService } from '../../../services/popup/popup.service';
import { getToken } from '../../../interceptors/auth.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  usersService = inject(UserService);
  user = signal<User | null>(null);
  username = signal<string | null>('');
  readonly image = model('');
  readonly dialog = inject(MatDialog);
  private _popupService = inject(PopupService);
  
  imageInput = [
    {
      dataName: 'image',
      dataType: 'text',
      data: this.image()
    }
  ]

  constructor() {
    this.username.set(getToken('username'));
    if(this.username()){
      this.usersService.getCurrent().subscribe({
        next: (res) => {  
            this.user.set(res)
            this.image.set(this.user()?.image ?? '')
            
          }
      })

      
    }
  }

  usersEffect = effect(() => {
    console.log(this.user());
    if(this.user()?.image){
      this.image.set(this.user()?.image ?? '');
    }
  })

  updateImage() {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: this.imageInput,
      });
  
      dialogRef.afterClosed().subscribe((result: InputType[]) => {
        if (result !== undefined) {
          let imageRes = result.filter(data => data.dataName === 'image')[0].data;
          
          this.image.set(imageRes);

          this.usersService.updateUser(this.image())
            .subscribe({
              next: (res: UserUpdateResponse) => {
                this._popupService.toast("Updated successfully", true);
                this.image.set(res.fields.image ?? '');
                console.log(this.image());
                
              },
              error: (error) => {
                this._popupService.toast("Error updating", false)
              }
            });
          }
      });
    }
}
