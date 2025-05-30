import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Transaction } from '../../../interfaces/transaction';
import { PopupService } from '../../../services/popup/popup.service';
import { UserService } from '../../../services/user/user.service';
import { getToken } from '../../../interceptors/auth.interceptor';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [MatExpansionModule, DatePipe, MatIconModule, MatInputModule,
    MatDatepickerModule, MatSelectModule, ReactiveFormsModule,
    CurrencyPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  transactionsService = inject(TransactionsService);
  private _popupService = inject(PopupService);
  usersService = inject(UserService);
  user: string | null;

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  constructor() {
    this.user = getToken('username')
    this.transactionsService.getTransactions()
      .subscribe({
        next: (res: Transaction[]) => {
          this.transactions = res;
          this.transactions.map(t => {
            t.createdAt = new Date(t.createdAt)
            t.updatedAt = new Date(t.updatedAt)

            this.usersService.getUsersById(t.from).subscribe({
              next: (usr) => {
                t.from = usr.username
              }
            });

            this.usersService.getUsersById(t.to).subscribe({
              next: (usr) => {
                t.to = usr.username
              }
            });
            return t
          })
          this.filteredTransactions = this.transactions;
        },
        error: (error) => {
          console.log(error);
          this._popupService.toast("Error while retrieveing transactions", false)
        }
      })
  }

  dateForm = new FormControl<Date | null>(null);
  amountForm = new FormControl<number | null>(null)
  typeForm = new FormControl<string | null>(null);

  filterByAmount() {
    this.dateForm.setValue(null);
    this.typeForm.setValue(null);
    if (!this.amountForm.value) {
      this.filteredTransactions = this.transactions;
      return;
    }

    this.filteredTransactions = this.transactions.filter((trans) =>
      trans.amount.toString().includes(this.amountForm.value?.toString() || '')
    );
  }

  filterByDate(){
    this.amountForm.setValue(null);
    this.typeForm.setValue(null);
    if (!this.dateForm) {
      this.filteredTransactions = this.transactions;
      return;
    }
    this.filteredTransactions = this.transactions.filter((trans) =>
      trans.createdAt.getFullYear() === this.dateForm.value?.getFullYear()
      && trans.createdAt.getMonth() === this.dateForm.value?.getMonth()
      && trans.createdAt.getDay() === this.dateForm.value?.getDay()
    );
  }

  filterByType(){
    this.dateForm.setValue(null);
    this.amountForm.setValue(null);
    this.transactions.forEach(t => console.log(t.type));
    console.log(this.typeForm.value);
    if(!this.typeForm.value){
      this.filteredTransactions = this.transactions;
      return;
    }
    
    this.filteredTransactions = this.transactions.filter((trans) => 
      trans.type === this.typeForm.value
    )
  }

  resetFilter(){
    this.filteredTransactions = this.transactions;
    this.filterByAmount();
    this.filterByDate();
    this.filterByType();
  }
}
