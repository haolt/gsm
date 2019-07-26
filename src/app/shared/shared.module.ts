import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchFormComponent } from './search-form/search-form.component';
import { StatisticInfoComponent } from './statistic-info/statistic-info.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    SearchFormComponent,
    StatisticInfoComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchFormComponent,
    StatisticInfoComponent,
    ModalComponent
  ]
})
export class SharedModule { }
