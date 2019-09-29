import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ]
})
export class TransactionsModule { }
