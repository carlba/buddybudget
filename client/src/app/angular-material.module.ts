import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatFormFieldModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule
  ],
})
export class AngularMaterialModule { }
