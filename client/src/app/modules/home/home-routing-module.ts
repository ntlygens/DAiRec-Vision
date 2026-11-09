import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePg } from './home-pg';

const routes: Routes = [
  { path: '', component: HomePg },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
