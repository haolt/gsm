import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchFormComponent } from './search-form/search-form.component';
import { StatisticInfoComponent } from './statistic-info/statistic-info.component';
import { ModalComponent } from './modal/modal.component';
import { DivisionCheckboxComponent } from './division-checkbox/division-checkbox.component';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    SearchFormComponent,
    StatisticInfoComponent,
    ModalComponent,
    DivisionCheckboxComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchFormComponent,
    StatisticInfoComponent,
    ModalComponent,
    DivisionCheckboxComponent,
    TimePipe
  ]
})
export class SharedModule { }
