import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceComponent } from './announce/announce.component';
// import { AnnounceComponent } from './announce/announce.component';

@NgModule({
  declarations: [AnnounceComponent],
  imports: [
    CommonModule,
    AnnounceRoutingModule
  ]
})
export class AnnounceModule { }
