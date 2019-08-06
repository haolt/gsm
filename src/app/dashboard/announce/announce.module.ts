import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AnnounceRoutingModule } from './announce-routing.module';
import { AnnounceComponent } from './announce/announce.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnounceAddComponent } from './announce-add/announce-add.component';
import { MultilangsModule } from 'src/app/multilangs/multilangs.module';

@NgModule({
  declarations: [AnnounceComponent, AnnounceAddComponent],
  imports: [
    CommonModule,
    AnnounceRoutingModule,
    SharedModule,
    MultilangsModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule
  ]
})
export class AnnounceModule { }
