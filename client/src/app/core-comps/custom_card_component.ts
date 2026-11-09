// custom-card.component.ts
import { Component, Input, ContentChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceScreenInterface } from '../models/ui-x';
import { CompType, CompSize } from '../models/comp-faces';


export interface CardButtonModel {
  label: string;
  action: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  style?: 'flat' | 'raised' | 'stroked';
  url?: string;
}

// Data model for card
export interface CardData {
  _id?: string;
  id?: string | number;
  title?: string;
  subtitle?: string;
  content?: string;
  img?: string;
  /** Material icon name for the card illustration; inferred from the title when absent. */
  icon?: string;
  imageAlt?: string;
  buttons?: CardButtonModel[];
  backgroundColor?: string;
  borderColor?: string;
  compType?: CompType | string;
  compSize?: CompSize | string;
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

/** Title keywords -> Material icon, most specific first. */
const CARD_ICONS: [RegExp, string][] = [
  [/stop wondering|assessment/i, 'fact_check'],
  [/thermal|night imaging/i, 'nights_stay'],
  [/alarm/i, 'campaign'],
  [/geofenc|patrol route/i, 'share_location'],
  [/logged|flight record|evidence/i, 'receipt_long'],
  [/drone|aerial|eyes in the sky|sky/i, 'flight'],
  [/construction site/i, 'construction'],
  [/energy|utilit/i, 'bolt'],
  [/estate/i, 'cottage'],
  [/clarity|4k|high.definition|\bhd\b/i, 'hd'],
  [/integration|nvr|dvr|recorder/i, 'hub'],
  [/weather/i, 'thunderstorm'],
  [/detection|analytic/i, 'radar'],
  [/streaming/i, 'live_tv'],
  [/live view|anywhere/i, 'devices'],
  [/alert/i, 'notifications_active'],
  [/recording|backup|cloud|storage/i, 'cloud_done'],
  [/monitoring|watch so/i, 'support_agent'],
  [/install/i, 'handyman'],
  [/eyes|blink|visib/i, 'visibility'],
  [/home|famil/i, 'home'],
  [/business|retail|store/i, 'storefront'],
  [/multi.site/i, 'domain'],
  [/industrial|logistic|warehouse/i, 'factory'],
  [/access|keycard|door|entry/i, 'key'],
  [/surveillance|video/i, 'videocam'],
  [/cctv|camera/i, 'camera_outdoor'],
];

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
      [class.isButton]="cardData?.compType === CompType.BUTTON || srvcData?.compType === CompType.BUTTON || compType === 'button'"
      [class.isTestimonial]="cardData?.compType === CompType.TESTIMONIAL || srvcData?.compType === CompType.TESTIMONIAL || compType === 'testimonial'"
      [class.isBanner]="cardData?.compType === CompType.BANNER || srvcData?.compType === CompType.BANNER || compType === 'banner'"
      [class.isSmall]="cardData?.compSize === CompSize.SMALL || srvcData?.compSize === CompSize.SMALL || compSize === 'small'"
      [class.isMedium]="cardData?.compSize === CompSize.MEDIUM || srvcData?.compSize === CompSize.MEDIUM || compSize === 'medium'"
      [class.isLarge]="cardData?.compSize === CompSize.LARGE || srvcData?.compSize === CompSize.LARGE || compSize === 'large'"

      [style.background]="cardData?.backgroundColor || null"
      [style.border-color]="cardData?.borderColor || null"
      matRipple
      [matRippleDisabled]="clickable">
    
      <!-- Image Section -->
      @if (cardData?.img || srvcData?.img || img) {
        <div class="card-image">
          <img mat-card-image [src]="cardData?.img || srvcData?.img || img" [alt]="cardData?.title || srvcData?.title || imageAlt" />
          @if (imageOverlay) {
            <div class="image-overlay">
              <ng-content select="drv-card-header"></ng-content>
            </div>
          }
        </div>
      }
    
      <!-- Illustration (product / feature cards without a photo) -->
      @if (showBand) {
        <div class="card-illustration" aria-hidden="true">
          <span class="ill-grid"></span>
          <span class="ill-ring"></span>
          <span class="ill-ring ill-ring--outer"></span>
          <span class="ill-sweep"></span>
          <mat-icon class="ill-icon">{{ iconName }}</mat-icon>
          <span class="ill-tag"><span class="ill-dot"></span>{{ tagText }}</span>
        </div>
      }

      <!-- Header Section (when no image) -->
      @if (!img && hasHeader) {
        <div class="card-header">
          <ng-content select="drv-card-header"></ng-content>
        </div>
      }

      <!-- Content Section -->      
      <mat-card-content>
        <div class="card-body">
          @if (showBadge) {
            <span class="card-badge" aria-hidden="true"><mat-icon>{{ iconName }}</mat-icon></span>
          }
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

          <!-- Default Buttons -->
          @if (cardData?.buttons && cardData?.buttons!.length > 0 && hasActions) {
            <div class="custom-card-actions">
              <ng-content select="drv-card-actions"></ng-content>
              @for (btn of cardData?.buttons; track btn) {
                <button
                  mat-button
                  [class.mat-raised-button]="btn.style === 'raised'"
                  [class.mat-stroked-button]="btn.style === 'stroked'"
                  [class.mat-flat-button]="btn.style === 'flat'"
                  [color]="btn.color || 'primary'"
                  (click)="onButtonClick(btn)">
                  @if (btn.icon) {
                    <mat-icon>{{ btn.icon }}</mat-icon>
                  }
                  {{ btn.label }}
                </button>
              }
            </div>
          }
        </div>
      </mat-card-content>

      <!-- Footer Section (when no image) -->
      @if (!img && hasFooter) {
        <div class="card-footer">
          <ng-content select="drv-card-footer"></ng-content>
        </div>
      }
    
      <!-- Actions Section -->
      @if (haveActions || hasActions) {
        <div class="custom-card-actions">
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
        min-height: 250px;
      }
      &.isMedium {
        min-height: 450px;
      }
      &.isLarge {
        min-height: 600px;
      }
      
    }

    .custom-card.isArticle {
      background: linear-gradient(135deg, #fefefe 0%, #e0e0e0 100%);
      // background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    }
    
    .custom-card.isProduct {
      background: linear-gradient(135deg, var(--drv-white) 0%, var(--drv-cloud) 100%);
    }
    
    .custom-card.isFeature {
      background: linear-gradient(135deg, var(--drv-white) 0%, var(--drv-mint-mist) 100%);
    }
    
    .custom-card.isTestimonial {
      background: linear-gradient(135deg, var(--drv-mint-mist) 0%, var(--drv-cloud) 100%);
    }
    
    .custom-card.isBanner {
      /* background: linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%); */
      background: linear-gradient(135deg, var(--drv-green) 0%, #27c26a 100%);
      color: var(--drv-on-green);
      h3 { font-size: x-large; color: var(--drv-midnight); }
    }
    
    .custom-card.isButton {
      background: linear-gradient(135deg, var(--drv-midnight) 0%, var(--drv-navy) 100%);
      font-weight: bold;
      font-size: 21px;
      color: #fefefe;
    }
    
    // *********************************** // 

    .custom-card.elevated {
      box-shadow: 
        0 4px 6px rgba(100, 150, 200, 0.1),
        0 2px 4px rgba(100, 150, 200, 0.08);
    }

    .custom-card-actions {
      display: flex;
      gap: 8px;

      padding: 8px 16px 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .custom-card-actions button {
      min-width: 120px;
    }

    .custom-card-actions button mat-icon {
      margin-right: 8px;
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
      font-size: 18px;
      font-weight: 500;
      color: var(--drv-navy);
      letter-spacing: 0.15px;
    }

    .card-subtitle {
      display: block;
      font-size: 14px;
      color: var(--drv-muted);
      margin-bottom: 8px;
      font-weight: 400;
    }

    .card-content {
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


    /* ---------- Illustrations ---------- */
    .card-illustration {
      position: relative;
      height: 132px;
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 55%, var(--drv-navy) 0%, var(--drv-midnight) 70%);
      border-bottom: 3px solid var(--drv-green);
    }
    .ill-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(159, 255, 201, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(159, 255, 201, 0.07) 1px, transparent 1px);
      background-size: 22px 22px;
    }
    .ill-ring {
      position: absolute;
      width: 84px; height: 84px;
      border-radius: 50%;
      border: 1.5px solid rgba(46, 204, 113, 0.55);
      box-shadow: 0 0 24px rgba(46, 204, 113, 0.25), inset 0 0 18px rgba(46, 204, 113, 0.15);
    }
    .ill-ring--outer {
      width: 124px; height: 124px;
      border: 1px dashed rgba(56, 200, 255, 0.35);
      box-shadow: none;
      animation: ill-spin 28s linear infinite;
    }
    .ill-sweep {
      position: absolute;
      width: 124px; height: 124px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, rgba(46, 204, 113, 0.28), transparent 55deg, transparent 360deg);
      animation: ill-spin 5s linear infinite;
    }
    .ill-icon {
      position: relative;
      width: 44px; height: 44px;
      font-size: 44px;
      color: var(--drv-mint);
      filter: drop-shadow(0 0 8px rgba(46, 204, 113, 0.6));
    }
    .ill-tag {
      position: absolute;
      top: 10px; left: 12px;
      display: inline-flex; align-items: center; gap: 6px;
      padding: 3px 8px;
      border-radius: 999px;
      background: rgba(26, 35, 50, 0.75);
      border: 1px solid rgba(159, 255, 201, 0.25);
      color: var(--drv-mint);
      font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
      white-space: nowrap; max-width: calc(100% - 24px); overflow: hidden; text-overflow: ellipsis;
    }
    .ill-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--drv-green);
      animation: ill-blink 2s ease-in-out infinite;
    }
    .custom-card.clickable:hover .ill-icon { transform: scale(1.08); transition: transform 0.3s ease; }
    @keyframes ill-spin { to { transform: rotate(360deg); } }
    @keyframes ill-blink { 50% { opacity: 0.25; } }
    @media (prefers-reduced-motion: reduce) {
      .ill-ring--outer, .ill-sweep, .ill-dot { animation: none; }
    }

    .card-badge {
      display: inline-flex;
      align-items: center; justify-content: center;
      width: 46px; height: 46px;
      margin-bottom: 10px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--drv-midnight) 0%, var(--drv-navy) 100%);
      box-shadow: inset 0 -3px 0 var(--drv-green);
      mat-icon { color: var(--drv-mint); font-size: 26px; width: 26px; height: 26px; }
    }
    .isBanner .card-badge {
      width: 56px; height: 56px;
      background: var(--drv-midnight);
      box-shadow: none;
      mat-icon { color: var(--drv-green); font-size: 32px; width: 32px; height: 32px; }
    }
    .isButton .card-body {
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .isButton .card-badge {
      width: auto; height: auto; margin: 0;
      background: none; box-shadow: none;
      mat-icon { color: var(--drv-green); font-size: 30px; width: 30px; height: 30px; }
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

  @Input() cardData?: CardData | null = null;
  @Input() srvcData?: ServiceScreenInterface | null = null;
  @Input() isPlaceholder: boolean = false;
  @Input() clickable = false;
  @Input() elevated = false;
  @Input() compType?: string;
  @Input() compSize?: string;

  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() img?: string;
  @Input() imageAlt?: string;
  @Input() imageOverlay = false;

  @Input() haveActions = false;

  @Input() backgroundColor?: string;
  @Input() borderColor?: string;
  @Output() buttonClick = new EventEmitter<CardButtonModel>();

  @ContentChild(CardHeaderComponent) hasHeader?: CardHeaderComponent;
  @ContentChild(CardHeaderComponent) hasFooter?: CardFooterComponent;
  @ContentChild(CardActionsComponent) hasActions?: CardActionsComponent;

  /** Explicit icon for the illustration; otherwise inferred from the card's title. */
  @Input() icon?: string;

  constructor(private router: Router ){  }

  /** Normalised component type of this card. */
  get kind(): string {
    return String(this.cardData?.compType ?? this.srvcData?.compType ?? this.compType ?? '').toLowerCase();
  }

  get hasImage(): boolean {
    return !!(this.cardData?.img || this.srvcData?.img || this.img);
  }

  /** Icon shown in the illustration band or badge. */
  get iconName(): string {
    const explicit = this.icon || this.cardData?.icon || this.cardData?.metadata?.icon;
    if (explicit) return explicit;
    const sources = [
      this.cardData?.title || this.srvcData?.title || this.title,
      this.cardData?.content || this.cardData?.subtitle,
      (this.cardData as any)?.name || this.srvcData?.name,
    ];
    for (const src of sources) {
      const hit = src ? CARD_ICONS.find(([re]) => re.test(src)) : undefined;
      if (hit) return hit[1];
    }
    return 'shield';
  }

  /** Short label in the illustration's status tag. */
  get tagText(): string {
    const sub = this.cardData?.subtitle || this.srvcData?.subtitle || this.subtitle || '';
    const name = (this.cardData as any)?.name || this.srvcData?.name || '';
    const t = (name && name.length <= 26 ? name : '') || (sub.length <= 26 ? sub : '') || 'DaiRec Vision';
    return t;
  }

  /** Full illustration band: product and feature cards without a photo. */
  get showBand(): boolean {
    return !this.hasImage && !this.isPlaceholder && (this.kind === 'product' || this.kind === 'feature');
  }

  /** Compact icon badge beside the title: articles, banners and button cards. */
  get showBadge(): boolean {
    return !this.hasImage && !this.isPlaceholder && ['article', 'banner', 'button'].includes(this.kind);
  }

  onButtonClick(button: CardButtonModel): void {
      this.buttonClick.emit(button);
    
      this.router.navigate([button.url]);
    }
}


