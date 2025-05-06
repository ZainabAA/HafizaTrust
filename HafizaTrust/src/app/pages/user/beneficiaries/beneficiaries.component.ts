import { Component, effect, inject, signal, model } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Beneficiary } from '../../../data/beneficiary';
import { UserService } from '../../../services/user/user.service';
import { Transaction } from '../../../data/transaction';
import { User } from '../../../data/user';
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
  dialog = inject(MatDialog);

  beneficiaries: Beneficiary[] = [];
  users = signal<User[]>([]);
  transactions = signal<Transaction[]>([]);
  readonly transferAmount = model(0);
  readonly withdrawAmount = model(0);

  constructor() {
    this.transactionsService.getTransactions().subscribe({
      next: (res) => {
        this.transactions.set(res);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.users.set(res);
      },
      error: (error) => {
        console.log(error);
      }
    });

    effect(() => {
      this.beneficiaries = this.users().filter(usr =>
        this.transactions().some(t =>
          t.to === usr._id || t.from === usr._id
        )
      );
    });
  }

  transferTo(beneficiary: Beneficiary) {
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
        const amount = result.find(d => d.dataName === 'amount')?.data;

        if (amount && beneficiary.username) {
          this.transferAmount.set(amount);
          this.transactionsService
            .transfer(this.transferAmount(), beneficiary.username)
            .subscribe({
              next: () => {
                this.transferAmount.set(0);
                console.log('Transfer successful');
              },
              error: (err) => {
                console.error('Transfer failed:', err);
              }
            });
        }
      }
    });
  }

  addNewBenefeciery(){
        const dialogRef = this.dialog.open(ModalComponent, {
          data: [
            {
              dataName: 'username',
              dataType: 'text',
              data: ''
            },
            {
              dataName: 'amount',
              dataType: 'number',
              data: 0
            }
          ]
        });
      
        dialogRef.afterClosed().subscribe((result: InputType[]) => {
          if (result !== undefined) {
            const username = result.find(d => d.dataName === 'username')?.data;
            const amount = result.find(d => d.dataName === 'amount')?.data;
      
            if (username && amount > 0) {
              this.transactionsService.transfer(amount, username).subscribe({
                next: () => {
                  this.transferAmount.set(0);
                  console.log('New beneficiary added via transfer');
                  this.refreshData();
                },
                error: (err) => {
                  console.error('Transfer failed:', err);
                }
              });
            }
          }
        });
      }

      refreshData() {
        this.transactionsService.getTransactions().subscribe({
          next: (res) => this.transactions.set(res),
          error: (err) => console.log(err)
        });
      
        this.usersService.getAllUsers().subscribe({
          next: (res) => this.users.set(res),
          error: (err) => console.log(err)
        });
      }
  }
