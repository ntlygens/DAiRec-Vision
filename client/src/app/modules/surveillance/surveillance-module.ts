import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveillanceRoutingModule } from './surveillance-routing-module';
import { Surveillance } from './surveillance';
import { RemoteMonitoring } from './remote-monitoring';


@NgModule({
  declarations: [
    Surveillance,
    RemoteMonitoring
  ],
  imports: [
    CommonModule,
    SurveillanceRoutingModule
  ]
})
export class SurveillanceModule { }
