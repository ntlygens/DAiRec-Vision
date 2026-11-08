import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing-module';
import { Plans } from './plans';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { CoreCompsModule } from '../../core-comps/core-comps-module';


@NgModule({
  declarations: [
    Plans,
  ],
  imports: [
    CommonModule,
    NgMatModule,
    PlansRoutingModule,
    CoreCompsModule
  ]
})
export class PlansModule { }
