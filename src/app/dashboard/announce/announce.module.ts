import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceComponent } from './announce/announce.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnounceAddComponent } from './announce-add/announce-add.component';
import { AnnounceListComponent } from './announce-list/announce-list.component';
// import { AnnounceComponent } from './announce/announce.component';

@NgModule({
  declarations: [AnnounceComponent, AnnounceAddComponent, AnnounceListComponent],
  imports: [
    CommonModule,
    AnnounceRoutingModule,
    SharedModule
  ]
})
export class AnnounceModule { }
