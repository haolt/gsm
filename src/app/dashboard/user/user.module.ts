import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFilterComponent } from './user-filter/user-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DivisionPipe } from './division.pipe';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAddComponent } from './user-add/user-add.component';
import { LayoutComponent } from './layout/layout.component';
import { HideKeyPipe } from './hide-key.pipe';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserRelatedComponent } from './user-related/user-related.component';

@NgModule({
  declarations: [
    UserComponent,
    UserFilterComponent,
    DivisionPipe,
    UserEditComponent,
    UserFormComponent,
    UserAddComponent,
    LayoutComponent,
    HideKeyPipe,
    UserDeleteComponent,
    UserViewComponent,
    UserRelatedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
