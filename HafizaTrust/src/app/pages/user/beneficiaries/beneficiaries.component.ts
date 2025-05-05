import { Component, effect, inject } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { TransactionsService } from '../../../services/transactions/transactions.service';
import { Beneficiary } from '../../../data/beneficiary';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.css'
})
export class BeneficiariesComponent {

  transactionsService = inject(TransactionsService);

  beneficiaries: Beneficiary[] = []

  constructor(){
    this.transactionsService.getBeneficiaries().subscribe({
      next: (res) => {
        this.beneficiaries = res
      }
    })
  }
}
