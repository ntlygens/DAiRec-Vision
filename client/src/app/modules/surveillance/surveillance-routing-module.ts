import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Surveillance } from './surveillance';

const routes: Routes = [
  { path: '', component: Surveillance },
  // Remote Monitoring moved to its own top-level page; keep old links working.
  { path: 'monitor', redirectTo: '/monitor' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveillanceRoutingModule { }
