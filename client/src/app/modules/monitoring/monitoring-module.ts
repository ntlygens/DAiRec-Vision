import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing-module';
import { RemoteMonitoring } from './remote-monitoring';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { CoreCompsModule } from '../../core-comps/core-comps-module';

@NgModule({
  declarations: [
    RemoteMonitoring,
  ],
  imports: [
    CommonModule,
    NgMatModule,
    MonitoringRoutingModule,
    CoreCompsModule
  ]
})
export class MonitoringModule { }
