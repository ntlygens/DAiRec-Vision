// custom-card.component.ts
import { Component, Input, ContentChild } from '@angular/core';
import { CardItem } from '../models/comp-faces';
import { ServiceScreenInterface } from '../models/ui-x';
import { CompType, CompSize } from '../models/comp-faces';

// Data model for card
export interface CardData {
  id?: string | number;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  backgroundColor?: string;
  borderColor?: string;
  compType?: string;
  compSize?: string;
  clickable?: boolean;
  elevated?: boolean;
  metadata?: any;
}

// Directive to mark card header content
@Component({
  selector: 'drv-card-header',
  standalone: false,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardHeaderComponent {}

// Directive to mark card header content
@Component({
  selector: 'drv-card-footer',
  standalone: false,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardFooterComponent {}

// Directive to mark card footer content
@Component({
  selector: 'drv-card-content',
  standalone: false,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardContentComponent {}

// Directive to mark card actions
@Component({
  selector: 'drv-card-actions',
  standalone: false,
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  `]
})
export class CardActionsComponent {}

// Main custom card component
@Component({
  selector: 'drv-custom-card',
  standalone: false,
  template: `
    <mat-card
      class="custom-card"
      [class.placeholder]="isPlaceholder"
      [class.clickable]="clickable"
      [class.elevated]="elevated"
      [class.isArticle]="cardData?.compType === CompType.ARTICLE || srvcData?.compType === CompType.ARTICLE || compType === 'article'"
      [class.isProduct]="cardData?.compType === CompType.PRODUCT || srvcData?.compType === CompType.PRODUCT || compType === 'product'"
      [class.isFeature]="cardData?.compType === CompType.FEATURE || srvcData?.compType === CompType.FEATURE || compType === 'feature'"
      [class.isTestimonial]="cardData?.compType === CompType.TESTIMONIAL || srvcData?.compType === CompType.TESTIMONIAL || compType === 'testimonial'"
      [class.isBanner]="cardData?.compType === CompType.BANNER || srvcData?.compType === CompType.BANNER || compType === 'banner'"
      [class.isSmall]="cardData?.compSize === CompSize.SMALL || srvcData?.compSize === CompSize.SMALL || compSize === 'small'"
      [class.isMedium]="cardData?.compSize === CompSize.MEDIUM || srvcData?.compSize === CompSize.MEDIUM || compSize === 'medium'"
      [class.isLarge]="cardData?.compSize === CompSize.LARGE || srvcData?.compSize === CompSize.LARGE || compSize === 'large'"

      [style.background]="backgroundColor"
      [style.border-color]="borderColor"
      matRipple
      [matRippleDisabled]="clickable">
    
      <!-- Image Section -->
      @if (cardData?.imageUrl || srvcData?.img || imageUrl) {
        <div class="card-image">
          <img mat-card-image [src]="cardData?.imageUrl || srvcData?.img || imageUrl" [alt]="cardData?.title || srvcData?.title || imageAlt" />
          @if (imageOverlay) {
            <div class="image-overlay">
              <ng-content select="drv-card-header"></ng-content>
            </div>
          }
        </div>
      }
    
      <!-- Header Section (when no image) -->
      @if (!imageUrl && hasHeader) {
        <div class="card-header">
          <ng-content select="drv-card-header"></ng-content>
        </div>
      }

      <!-- Content Section -->      
      <mat-card-content>
        <div class="card-body">
          @if ((cardData?.title || cardData?.subtitle) || (srvcData?.title || srvcData?.subtitle || title || subtitle)) {
            <div class="card-title">
              <h3>{{ cardData?.title || srvcData?.title || title}}</h3>
              @if (cardData?.subtitle || srvcData?.subtitle || subtitle) {
                <span class="card-subtitle">{{ cardData?.subtitle || srvcData?.subtitle || subtitle}}</span>
              }
            </div>
          }
      
          <div class="card-content">
            <ng-content select="drv-card-content"></ng-content>
            @if (cardData?.content || srvcData?.content || content) {
              <p>{{ cardData?.content || srvcData?.content || content }}</p>
            }
          </div>
        </div>
      </mat-card-content>

      <!-- Footer Section (when no image) -->
      @if (!imageUrl && hasFooter) {
        <div class="card-footer">
          <ng-content select="drv-card-footer"></ng-content>
        </div>
      }
    
      <!-- Actions Section -->
      @if (hasActions) {
        <div class="card-actions">
          <ng-content select="drv-card-actions"></ng-content>
        </div>
      }
    </mat-card>
    `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      width: 100%;

    }

    .custom-card {
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      border: 1px solid rgba(200, 220, 235, 0.5);
      background: linear-gradient(135deg, 
        rgba(240, 248, 255, 0.9) 0%, 
        rgba(230, 242, 255, 0.9) 100%);
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 1px 3px rgba(100, 150, 200, 0.08),
        0 1px 2px rgba(100, 150, 200, 0.06);
      cursor: pointer;

      &.isSmall {
        height: 250px;
      }
      &.isMedium {
        height: 450px;
      }
      &.isLarge {
        height: 600px;
      }
      
    }

    .custom-card.isArticle {
      background: linear-gradient(135deg, #fefefe 0%, #e0e0e0 100%);
      // background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    }
    
    .custom-card.isProduct {
      background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
    }
    
    .custom-card.isFeature {
      background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    }
    
    .custom-card.isTestimonial {
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
    }
    
    .custom-card.isBanner {
      background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%);
    }
    
    // *********************************** // 

    .custom-card.elevated {
      box-shadow: 
        0 4px 6px rgba(100, 150, 200, 0.1),
        0 2px 4px rgba(100, 150, 200, 0.08);
    }

    .custom-card.clickable {
      cursor: pointer;
    }

    .custom-card:not(.clickable) {
      // background-color: purple;
      cursor: default;
    }

    .custom-card:not(.clickable):hover {
      transform: translateY(-2px);
      border-color: rgba(150, 200, 240, 0.6);
    }

    .custom-card.clickable:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 12px rgba(100, 150, 200, 0.15),
        0 4px 8px rgba(100, 150, 200, 0.1);
      border-color: rgba(150, 200, 240, 0.6);
    }

    .custom-card.clickable:active {
      transform: translateY(0);
    }

    .custom-card.placeholder {
      background: linear-gradient(135deg, #e0e0e0 25%, #f5f5f5 25%, #f5f5f5 50%, #e0e0e0 50%, #e0e0e0 75%, #f5f5f5 75%, #f5f5f5);
      background-size: 20px 20px;
      cursor: default;
    }
    /* from dynamic card below */
    // .dynamic-card {
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   overflow: hidden;
    //   transition: transform 0.3s ease, box-shadow 0.3s ease;
    //   cursor: pointer;
    // }


    // .custom-card:hover:not(.placeholder) {
    //   transform: translateY(-4px);
    //   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    // }

   

    mat-card-content {
      padding: 16px;
      flex-shrink: 0;
    }

    mat-card-title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    mat-card-subtitle {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 8px;
    }

    .card-text {
      font-size: 14px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.7);
      margin: 0;
    }

    /* Dynamic Card Styles Above */



    .card-image {
      width: 100%;
      flex: 1;
      overflow: hidden;
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .custom-card.clickable:hover .card-image img {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        transparent 100%
      );
      color: white;
    }

    .card-header {
      padding: 16px 16px 0;
    }
    
    .card-footer {
      padding: 0 16px 16px;
    }

    .card-body {
      padding: 16px;
      flex: 1;
    }

    .card-title h3 {
      margin: 0 0 8px;
      font-size: 20px;
      font-weight: 500;
      color: #1a237e;
      letter-spacing: 0.15px;
    }

    .card-subtitle {
      display: block;
      font-size: 14px;
      color: #5c6bc0;
      margin-bottom: 8px;
      font-weight: 400;
    }

    .card-content {
      color: #37474f;
      font-size: 14px;
      line-height: 1.6;
      letter-spacing: 0.25px;
      flex-shrink: 0;
    }

    .card-content p {
      margin: 0;
    }

    .card-actions {
      padding: 8px 16px 16px;
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .card-image {
        height: 160px;
      }
    }
  `]
})
export class CustomCardComponent {
  CompType = CompType;
  CompSize = CompSize;

  @Input() cardData?: CardItem | null = null;
  @Input() srvcData?: ServiceScreenInterface | null = null;
  @Input() isPlaceholder: boolean = false;

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() imageUrl?: string;
  @Input() imageAlt?: string;
  @Input() imageOverlay = false;
  @Input() compType?: string;
  @Input() compSize?: string;
  @Input() clickable = false;
  @Input() elevated = false;
  @Input() backgroundColor?: string;
  @Input() borderColor?: string;

  @ContentChild(CardHeaderComponent) hasHeader?: CardHeaderComponent;
  @ContentChild(CardHeaderComponent) hasFooter?: CardFooterComponent;
  @ContentChild(CardActionsComponent) hasActions?: CardActionsComponent;
}


