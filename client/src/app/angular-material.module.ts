import { NgModule } from '@angular/core';

import {
  MatTableModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatTableModule,
    MatButtonModule
  ],
})
export class AngularMaterialModule { }
