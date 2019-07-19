import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StatisticComponent
      },
      {
        path: 'announces',
        loadChildren: './announce/announce.module#AnnounceModule'
      },
      {
        path: 'requests',
        loadChildren: './request/request.module#RequestModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
