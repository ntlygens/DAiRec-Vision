import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMatModule } from '../ng-mat/ng-mat.module';
import { RouterModule } from '@angular/router';

import { CustomCardComponent } from './custom_card_component';
import { HeaderBar } from './header-bar';
import { FooterBar } from './footer-bar';
import { JumboTronComponent } from './jumbo-tron';
import { HeroBanner } from './hero-banner';
import { PropertyTypeCard } from './property-type-card';



@NgModule({
  declarations: [
    CustomCardComponent,
    HeaderBar,
    FooterBar,
  ],
  imports: [
    CommonModule,
    NgMatModule,
    RouterModule,
    JumboTronComponent,
    HeroBanner,
    PropertyTypeCard,
  ],
  exports: [
    CustomCardComponent,
    HeaderBar,
    FooterBar,
    JumboTronComponent,
    HeroBanner,
    PropertyTypeCard,
  ]
})
export class CoreCompsModule { }
