import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestComponent } from './request/request.component';
import { RequestAddComponent } from './request-add/request-add.component';
import { RequestListComponent } from './request-list/request-list.component';
import { MultilangsModule } from 'src/app/multilangs/multilangs.module';

@NgModule({
  declarations: [RequestComponent, RequestAddComponent, RequestListComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule,
    MultilangsModule
  ]
})
export class RequestModule { }
