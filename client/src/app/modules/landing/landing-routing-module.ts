import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPg } from './landing-pg';
import { DRVRouteInterface } from '../../models/ui-x';

export const routes: DRVRouteInterface[] = [
  {
    path: '',
    component: LandingPg,
    
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
