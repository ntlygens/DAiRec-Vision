import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Surveillance } from './surveillance';
import { RemoteMonitoring } from './remote-monitoring';

const routes: Routes = [
  {
    path: '',
    component: Surveillance,
    data: {
      breadcrumb: 'Surveillance',
    }
  },
  {
    path: 'monitor',
    component: RemoteMonitoring,
    data: {
      breadcrumb: 'Remote Monitoring',
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveillanceRoutingModule { }
