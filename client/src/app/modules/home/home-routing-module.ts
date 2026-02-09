import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePg } from './home-pg';

export const routes: Routes = [
  {
    path: '',
    component: HomePg,
    // loadChildren: () => import('../home/home-module')
    //   .then(m => m.HomeModule)

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
