import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const materialArr = [
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatSnackBarModule,
      MatRadioModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatCheckboxModule,
      MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialArr
  ],
  exports: [
    ...materialArr
  ]
})
export class MaterialModule { }
