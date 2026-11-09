import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessControlRoutingModule } from './access-control-routing-module';
import { AccessControl } from './access-control';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { CoreCompsModule } from '../../core-comps/core-comps-module';


@NgModule({
  declarations: [
    AccessControl
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule,
    NgMatModule,
    CoreCompsModule,
  ]
})
export class AccessControlModule { }
