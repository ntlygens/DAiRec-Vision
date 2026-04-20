import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveillanceRoutingModule } from './surveillance-routing-module';
import { Surveillance } from './surveillance';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { RemoteMonitoring } from './remote-monitoring';
import { CoreCompsModule } from '../../core-comps/core-comps-module';


@NgModule({
  declarations: [
    Surveillance,
    RemoteMonitoring
  ],
  imports: [
    CommonModule,
    NgMatModule,
    SurveillanceRoutingModule,
    CoreCompsModule
  ]
})
export class SurveillanceModule { }
