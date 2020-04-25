import { Component, OnInit } from '@angular/core';
import { AllCommunityModules, GridOptions, GridApi } from '@ag-grid-community/all-modules';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

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
  public sum = new FormControl();
  private gridApi: GridApi;
  private gridColumnApi;

  defaultColDef: GridOptions['defaultColDef'] = { sortable: true, filter: true, editable: true };
  columnDefs: GridOptions['columnDefs'] = [
    {headerName: 'Name', field: 'name'},
    {headerName: 'Description', field: 'Description'},
    {headerName: 'Category', field: 'category'},
    {headerName: 'Amount', field: 'amount', type: ['numericColumn']},
    {
      headerName: 'Date',
      field: 'date',
      type: ['dateColumn'],
      }
  ];
  columnTypes: GridOptions['columnTypes'] = {
    nonEditableColumn: {editable: false},
    dateColumn: {
      filter: 'agDateColumnFilter',
      suppressMenu: true,
      valueFormatter: (data: any) => moment(data.amount).format('YYYY-MM-DD HH:MM'),
      editable: false
    },
  };
  modules = AllCommunityModules;
  transactions: Transaction[];
  transactions$ = this.transactionsService.getAll();
  updateGrid$: Subject<boolean> = new Subject();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.updateGrid$.pipe(
      concatMap(() => this.calculateSum('amount'))
    ).subscribe((sum) => {
      this.sum.setValue(sum);
    });
  }

  calculateSum(column): Observable<number> {
    let sum = 0;
    this.gridApi.forEachNodeAfterFilter((node, index) => {
      sum += +node.data[column];
    });
    return of(sum);
  }

  async onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.updateGrid$.next(true);
  }

  onCellValueChanged(cellValue) {
    const transaction: Transaction = {} as Transaction;
    transaction[cellValue.column.colId] = cellValue.value;
    this.transactionsService.patch(cellValue.data.id, transaction)
      .pipe(tap(() => this.updateGrid$.next(true))
      ).subscribe();
  }

  async onFilterChanged(filterValue) {
    this.updateGrid$.next(true);
  }
}
