import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

import { TransactionsService } from './transactions.service';
import { Transaction } from '../../../../src/transactions/transaction.entity';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public dbColumns: string[] = ['name', 'description', 'category', 'amount', 'date'];
  public displayedColumns: string[] = [...this.dbColumns, 'actions'];
  public transactions: Transaction[]; 
  public dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.transactionsService.getAll()
      .subscribe(transactions => {
        this.dataSource.data = this.transactions = transactions;
      });
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onDelete(id: number) {
    const action = this.transactionsService.delete(id);
    action.subscribe(res => {
      this.dataSource.data = this.transactions = this.transactions
        .filter(transaction => transaction.id !== id)
    },
    error => { console.log('error') });
  }
}
