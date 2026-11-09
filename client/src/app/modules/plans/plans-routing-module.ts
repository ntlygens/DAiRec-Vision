import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Plans } from './plans';

const routes: Routes = [
  { path: '', component: Plans },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
