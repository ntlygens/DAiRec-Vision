import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { RouterModule } from '@angular/router';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { HomePg } from './home-pg';



@NgModule({
  declarations: [
    HomePg
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NgMatModule,
  ]
})
export class HomeModule { }
