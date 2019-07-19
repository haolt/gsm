import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnounceComponent } from './announce/announce.component';

const routes: Routes = [
  {
    path: '',
    component: AnnounceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnounceRoutingModule { }
