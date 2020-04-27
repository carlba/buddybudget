import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionEditorComponent } from './transactions/transaction-editor/transaction-editor.component';
import { TransactionUploadComponent } from './transactions/transaction-upload/transaction-upload.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/transactions',
    pathMatch: 'full'
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
  {
    path: 'transactions/upload', component: TransactionUploadComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
