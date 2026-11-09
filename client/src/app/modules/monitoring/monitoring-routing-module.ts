import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemoteMonitoring } from './remote-monitoring';

const routes: Routes = [
  { path: '', component: RemoteMonitoring },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
