import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectionRoutingModule } from './protection-routing-module';
import { Protection } from './protection';


@NgModule({
  declarations: [
    Protection
  ],
  imports: [
    CommonModule,
    ProtectionRoutingModule
  ]
})
export class ProtectionModule { }
