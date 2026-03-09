import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Protection } from './protection';

const routes: Routes = [
  {
    path: '',
    component: Protection,
    data: {
      breadcrumb: 'Protection',
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectionRoutingModule { }
