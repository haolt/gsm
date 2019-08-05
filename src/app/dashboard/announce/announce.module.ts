import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceComponent } from './announce/announce.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnounceAddComponent } from './announce-add/announce-add.component';
import { AnnounceListComponent } from './announce-list/announce-list.component';
import { AnnounceItemComponent } from './announce-item/announce-item.component';
import { MultilangsModule } from 'src/app/multilangs/multilangs.module';

@NgModule({
  declarations: [AnnounceComponent, AnnounceAddComponent, AnnounceListComponent, AnnounceItemComponent],
  imports: [
    CommonModule,
    AnnounceRoutingModule,
    SharedModule,
    MultilangsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class AnnounceModule { }
