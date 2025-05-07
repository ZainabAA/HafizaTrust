import { Component, effect, inject, signal, model } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Beneficiary } from '../../../interfaces/beneficiary';
import { UserService } from '../../../services/user/user.service';
import { Transaction } from '../../../interfaces/transaction';
import { User } from '../../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { InputType, ModalComponent } from '../../../components/modal/modal/modal.component';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.css'
})
export class BeneficiariesComponent {

  transactionsService = inject(TransactionsService);
  usersService = inject(UserService);

  beneficiaries: Beneficiary[] = [];
  users = signal<User[]>([]);
  transactions = signal<Transaction[]>([]);

  readonly transferAmount = model(0);
  readonly transferUsername = model('');
  readonly withdrawAmount = model(0);
  readonly dialog = inject(MatDialog);

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

  constructor(){
    this.transactionsService.getTransactions().subscribe({
      next: (res) => {
        this.transactions.set(res)
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users.set(res)
      },
      error: (error) => {
        console.log(error);
      }
    });
    effect(() => {
    console.log(this.users(), this.transactions());
    
    this.beneficiaries = this.users().filter(usr => this.transactions()
      .some(t => (t.to === usr._id) || (t.from === usr._id)));
    })
  }

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
          this.transferUsername.set(usernameRes);
  
          this.transactionsService.transfer(this.transferAmount(), this.transferUsername())
            .subscribe({
              next: (res) => {
                this.transferAmount.set(0);
                this.transferUsername.set('');
              },
              error: (error) => {
                console.log(error);
              }
            });
        }
      });
    }
}
