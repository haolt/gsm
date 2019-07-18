import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { MultilangsModule } from '../multilangs/multilangs.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MultilangsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LoginModule { }
