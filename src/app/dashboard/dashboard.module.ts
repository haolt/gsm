import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MultilangsModule } from '../multilangs/multilangs.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatisticComponent } from './statistic/statistic.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, StatisticComponent, FooterComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MultilangsModule
  ]
})
export class DashboardModule { }
