import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TransactionsService } from './transactions.service';
import { Transaction } from '../../../../src/transactions/transaction.entity';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public dbColumns: string[] = ['name', 'description', 'amount', 'date'];
  public displayedColumns: string[] = [...this.dbColumns, 'actions'];
  public transactions: Transaction[] = []
  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() { 
    this.transactionsService.getAll()
    .subscribe(data => this.transactions = data);
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onDelete(id: number) {
    const action = this.transactionsService.delete(id);
    action.subscribe(res => {
      this.transactions = this.transactions.filter(t => t.id !== id);
    },
    error => { console.log('error') });
  }
}
