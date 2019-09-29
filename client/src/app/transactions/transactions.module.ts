import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexModule } from '@angular/flex-layout';

import { TransactionsComponent } from './transactions.component';

@NgModule({
  declarations: [TransactionsComponent, TransactionEditorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FlexModule
  ]
})
export class TransactionsModule { }
