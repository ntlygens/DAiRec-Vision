import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DroneRoutingModule } from './drone-routing-module';
import { Drone } from './drone';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { CoreCompsModule } from '../../core-comps/core-comps-module';


@NgModule({
  declarations: [
    Drone,
  ],
  imports: [
    CommonModule,
    NgMatModule,
    DroneRoutingModule,
    CoreCompsModule
  ]
})
export class DroneModule { }
