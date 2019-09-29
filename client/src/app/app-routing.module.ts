import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionEditorComponent } from './transactions/transaction-editor/transaction-editor.component';

const routes: Routes = [
  {
    path: '', component: TransactionsComponent
  },
  {
    path: 'transactions', component: TransactionsComponent
  },
  {
    path: 'transactions/create', component: TransactionEditorComponent
  },
  {
    path: 'transactions/edit/:transactionId', component: TransactionEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
