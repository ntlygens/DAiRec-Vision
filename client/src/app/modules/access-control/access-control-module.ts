import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessControlRoutingModule } from './access-control-routing-module';
import { AccessControl } from './access-control';


@NgModule({
  declarations: [
    AccessControl
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule
  ]
})
export class AccessControlModule { }
