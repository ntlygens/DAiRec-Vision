import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMatModule } from '../ng-mat/ng-mat.module';
import { RouterModule } from '@angular/router';

import { CustomCardComponent } from './custom_card_component';
import { HeaderBar } from './header-bar';
import { FooterBar } from './footer-bar';
import { JumboTronComponent } from './jumbo-tron';
import { BreadcrumbComponent } from './breadcrumbs';



@NgModule({
  declarations: [
    CustomCardComponent,
    HeaderBar,
    FooterBar,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    NgMatModule,
    RouterModule,
    JumboTronComponent,
  ],
  exports: [
    CustomCardComponent,
    HeaderBar,
    FooterBar,
    JumboTronComponent,
    BreadcrumbComponent,
  ]
})
export class CoreCompsModule { }
