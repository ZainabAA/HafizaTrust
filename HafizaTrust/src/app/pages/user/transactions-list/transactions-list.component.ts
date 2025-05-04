import { DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect, MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [MatExpansionModule, DatePipe, MatIconModule, MatInputModule,
    MatDatepickerModule, MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.css'
})
export class TransactionsListComponent {
  transactions = [
    {
        "_id": "6811dbaaa5fbc8dfe6a924b0",
        "type": "deposit",
        "amount": 100,
        "from": "6811d618a5fbc8dfe6a92486",
        "to": "6811d618a5fbc8dfe6a92486",
        "createdAt": new Date("2025-04-30T08:13:30.820Z"),
        "updatedAt": new Date("2025-04-30T08:13:30.820Z"),
        "__v": 0
    },
    {
        "_id": "6811ddeea5fbc8dfe6a924bc",
        "type": "transfer",
        "amount": 50,
        "from": "6811d618a5fbc8dfe6a92486",
        "to": "672377e25f25f11b001d7d74",
        "createdAt": new Date("2025-04-30T08:23:10.108Z"),
        "updatedAt": new Date("2025-04-30T08:23:10.108Z"),
        "__v": 0
    }
  ];

  filteredTransactions = this.transactions;
  typeSelect = null;

  changeFilteredTrans(search: string) {
    if (!search) {
      this.filteredTransactions = this.transactions;
      return;
    }

    this.filteredTransactions = this.transactions.filter((trans) =>
      trans.amount.toString().includes(search)
    );
  }

  filterByDate(event: MatDatepickerInputEvent<Date>){
    if (!event.value) {
      this.filteredTransactions = this.transactions;
      return;
    }
    this.filteredTransactions = this.transactions.filter((trans) =>
      trans.createdAt.getFullYear() === event.value?.getFullYear()
      && trans.createdAt.getMonth() === event.value?.getMonth()
      && trans.createdAt.getDay() === event.value?.getDay()
    );
  }

  filterByType(val: string){
    this.transactions.forEach(t => console.log(t.type));
    console.log(val);
    if(!val){
      this.filteredTransactions = this.transactions;
      return;
    }
    this.filteredTransactions = this.transactions.filter((trans) => 
      trans.type === val
    )
  }
}
