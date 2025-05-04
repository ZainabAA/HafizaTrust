import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, DatePipe, MatIconModule],
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
        "createdAt": "2025-04-30T08:13:30.820Z",
        "updatedAt": "2025-04-30T08:13:30.820Z",
        "__v": 0
    },
    {
        "_id": "6811ddeea5fbc8dfe6a924bc",
        "type": "transfer",
        "amount": 50,
        "from": "6811d618a5fbc8dfe6a92486",
        "to": "672377e25f25f11b001d7d74",
        "createdAt": "2025-04-30T08:23:10.108Z",
        "updatedAt": "2025-04-30T08:23:10.108Z",
        "__v": 0
    }
]
}
