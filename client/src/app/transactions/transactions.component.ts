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
  public displayedColumns: string[] = ['name', 'description', 'date', 'actions'];
  public dbColumns: string[] = ['name', 'description', 'date'];
  public transactions$: Observable<Transaction[]> = this.transactionsService.getAll();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {}

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
