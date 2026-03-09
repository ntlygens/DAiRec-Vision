import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessControl } from './access-control';

const routes: Routes = [
  {
    path: '',
    component: AccessControl,
    data: {
      breadcrumb: 'Access',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessControlRoutingModule { }
