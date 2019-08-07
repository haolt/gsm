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
import { AnnounceSearchComponent } from './announce-search/announce-search.component';
import { AnnounceEditComponent } from './announce-edit/announce-edit.component';
import { AnnounceDeleteComponent } from './announce-delete/announce-delete.component';

@NgModule({
  declarations: [AnnounceComponent, AnnounceAddComponent, AnnounceSearchComponent, AnnounceEditComponent, AnnounceDeleteComponent],
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
