import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request/request.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestListComponent } from './request-list/request-list.component';
import { MultilangsModule } from 'src/app/multilangs/multilangs.module';
import { TimePipe } from './time.pipe';
import { TypePipe } from './type.pipe';
import { RequestEditComponent } from './request-edit/request-edit.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestDeleteComponent } from './request-delete/request-delete.component';
import { RequestFilterComponent } from './request-filter/request-filter.component';

@NgModule({
  declarations: [RequestComponent, RequestAddComponent, RequestListComponent, TimePipe, TypePipe, RequestEditComponent, RequestDetailComponent, RequestDeleteComponent, RequestFilterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RequestRoutingModule,
    SharedModule,
    MultilangsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RequestModule { }
