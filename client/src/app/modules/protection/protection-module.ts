import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProtectionRoutingModule } from './protection-routing-module';
import { Protection } from './protection';
import { NgMatModule } from '../../ng-mat/ng-mat.module';
import { CoreCompsModule } from "../../core-comps/core-comps-module";


@NgModule({
  declarations: [
    Protection
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProtectionRoutingModule,
    NgMatModule,
    CoreCompsModule
]
})
export class ProtectionModule { }
