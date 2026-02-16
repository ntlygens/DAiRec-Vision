import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing-module';
import { RouterModule } from '@angular/router';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPg } from './landing-pg';
import { CoreCompsModule } from "../../core-comps/core-comps-module";



@NgModule({
  declarations: [
    LandingPg
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    NgMatModule,
    FormsModule,
    ReactiveFormsModule,
    CoreCompsModule
],
  exports: [  ]
})
export class LandingModule { }
