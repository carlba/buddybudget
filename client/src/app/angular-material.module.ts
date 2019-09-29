import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatFormFieldModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class AngularMaterialModule { }
