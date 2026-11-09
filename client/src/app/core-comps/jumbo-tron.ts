// jumbotron.component.ts
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';

// Interface for Jumbotron data
export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
    BUTTON = 'button' as any,
}

export interface JumbotronDataModel {
  title?: string;
  subtitle?: string;
  pgLoc?: 'landing' | 'home' | 'protect' | 'surveil' | 'access' | 'contact' | string;
  description?: string;
  img?: string;
  imageAlt?: string;
  buttons?: JumbotronButton[];
  theme?: 'primary' | 'accent' | 'warn' | 'light' | 'dark';
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
  compSize?: 'small' | 'medium' | 'large';
  compType?: CompType | string;
  content?: Blob | string;
  backgroundColor?: string;
  height?: string;
  margin?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface JumbotronButton {
  label: string;
  action: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  style?: 'flat' | 'raised' | 'stroked';
  url?: string;
}

// Template directive for custom content
@Component({
  selector: 'drv-jumbotron-content',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class JumbotronContentComponent {}

@Component({
  selector: 'drv-jumbotron-actions',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class JumbotronActionsComponent {}

@Component({
  selector: 'drv-jumbotron-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule
],
  template: `
    <div
      class="jumbotron-container"
      [class.has-background]="data.imagePosition === 'background'"
      [class.isArticle]="data.compType === 'article'"
      [class.isProduct]="data.compType === 'product'"
      [class.isFeature]="data.compType === 'feature'"
      [class.isTestimonial]="data.compType === 'testimonial'"
      [class.isBanner]="data.compType === 'banner'"
      [class.isSmall]="data.compSize === 'small'"
      [class.isMedium]="data.compSize === 'medium'"
      [class.isLarge]="data.compSize === 'large'"
      [class.theme-primary]="data.theme === 'primary'"
      [class.theme-accent]="data.theme === 'accent'"
      [class.theme-warn]="data.theme === 'warn'"
      [class.theme-light]="data.theme === 'light'"
      [class.theme-dark]="data.theme === 'dark'"
      [class.layout-left]="data.imagePosition === 'left'"
      [class.layout-right]="data.imagePosition === 'right'"
      [class.layout-top]="data.imagePosition === 'top'"
      [class.layout-bottom]="data.imagePosition === 'bottom'"
      [style.height]="data.compSize || 'auto'"
      [style.background-color]="data.imagePosition !== 'background' ? data.backgroundColor : null"
      [style.background-image]="data.imagePosition === 'background' ? 'url(' + data.img + ')' : null">

      <!-- Background Overlay -->
      @if (data.imagePosition === 'background' && data.overlay) {
        <div
          class="background-overlay"
          [style.opacity]="data.overlayOpacity || 0.5">
        </div>
      }
    
      <!-- <div
      *ngIf="data.imagePosition === 'background' && data.overlay"
      class="background-overlay"
      [style.opacity]="data.overlayOpacity || 0.5">
    </div> -->
    
    <!-- Image Section (non-background) -->
    @if (data.img && data.imagePosition !== 'background') {
      <div
        class="jumbotron-image">
        <img
          [src]="data.img"
          [alt]="data.imageAlt || 'Jumbotron image'"
          (load)="onImageLoad()"
          (error)="onImageError($event)">
      </div>
    }
    
    <!-- Content Section -->
    <div class="jumbotron-content">
      <!-- Default Content -->
      @if (!hasCustomContent) {
        <div class="default-content">
          @if (data.title) {
            <h1 class="jumbotron-title">
              {{ data.title }}
            </h1>
          }
          @if (data.subtitle) {
            <h2 class="jumbotron-subtitle">
              {{ data.subtitle }}
            </h2>
          }
          @if (data.description) {
            <p class="jumbotron-description">
              {{ data.description }}
            </p>
          }
          <!-- Default Buttons -->
          @if (data.buttons && data.buttons.length > 0 && !hasCustomActions) {
            <div class="jumbotron-actions">
              @for (btn of data.buttons; track btn) {
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
      }
    
      <!-- Custom Content Projection -->
      <ng-content select="drv-jumbotron-content"></ng-content>
    
      <!-- Custom Actions Projection -->
      @if (hasCustomActions) {
        <div class="jumbotron-actions custom-actions">
          <ng-content select="drv-jumbotron-actions"></ng-content>
        </div>
      }
    </div>
    </div>
    `,
  styles: [`
    .jumbotron-container {
      position: relative;
      display: flex;
      width: 100%;
      min-height: 300px;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      
      &.isSmall {
        min-height: 350px;
      }
      &.isMedium {
        min-height: 450px;
      }
      &.isLarge {
        min-height: 600px;
      }
    }

    .jumbotron-container:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    /* Background Image Layout */
    .jumbotron-container.has-background {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .jumbotron-container.isArticle {
      background-attachment: unset;
    }
    .jumbotron-container.isProduct {
      background-attachment: unset;
    }
    .jumbotron-container.isFeature {
      background-attachment: cover;
      background-position: 50% 75%;
      button {
        color: white;
        background: rgba(250, 250, 250, 0.25);

      }
      .default-content {
        margin-bottom: auto;
      }
    }
    .jumbotron-container.isTestimonial {
      background-attachment: unset;
    }
    .jumbotron-container.isBanner {
      background-attachment: fixed;
      button {
        color: white;
        background: rgba(250, 250, 250, 0.25);

      }
    }

    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .has-background .jumbotron-content {
      position: relative;
      z-index: 2;
      color: white;
      width: 100%;
    }

    /* Theme Styles */
    .theme-primary {
      background: linear-gradient(135deg, var(--drv-midnight) 0%, var(--drv-navy) 100%);
      color: white;
    }

    .theme-accent {
      background: linear-gradient(135deg, var(--drv-green) 0%, #27c26a 100%);
      color: white;
    }

    .theme-warn {
      background: linear-gradient(135deg, var(--drv-warning) 0%, #ffc857 100%);
      color: white;
    }

    .theme-light {
      background: #f5f5f5;
      color: var(--drv-text);
    }

    .theme-dark {
      background: #212121;
      color: white;
    }

    /* Layout Styles */
    .layout-left, .layout-right {
      flex-direction: row;
      align-items: center;
    }

    .layout-right {
      flex-direction: row-reverse;
    }

    .layout-top, .layout-bottom {
      flex-direction: column;
    }

    .layout-bottom {
      flex-direction: column-reverse;
    }

    /* Image Styles */
    .jumbotron-image {
      flex: 0 0 40%;
      max-width: 40%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .layout-top .jumbotron-image,
    .layout-bottom .jumbotron-image {
      flex: 0 0 auto;
      max-width: 100%;
      max-height: 400px;
    }

    .jumbotron-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .jumbotron-container:hover .jumbotron-image img {
      transform: scale(1.05);
    }

    /* Content Styles */
    .jumbotron-content {
      flex: 1;
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .default-content {
      max-width: 800px;
    }

    .jumbotron-title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .jumbotron-subtitle {
      font-size: 1.5rem;
      font-weight: 400;
      margin: 0 0 24px 0;
      opacity: 0.9;
    }

    .jumbotron-description {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0 0 32px 0;
      opacity: 0.85;
    }

    .jumbotron-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .jumbotron-actions button {
      min-width: 120px;
    }

    .jumbotron-actions button mat-icon {
      margin-right: 8px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .layout-left, .layout-right {
        flex-direction: column;
      }

      .jumbotron-image {
        flex: 0 0 auto;
        max-width: 100%;
        max-height: 300px;
      }

      .jumbotron-content {
        padding: 24px;
      }

      .jumbotron-title {
        font-size: 2rem;
      }

      .jumbotron-subtitle {
        font-size: 1.25rem;
      }

      .jumbotron-description {
        font-size: 1rem;
      }
    }
  `]
})
export class JumboTronComponent {
  @Input() data: JumbotronDataModel = {
    theme: 'light',
    overlay: false,
    overlayOpacity: 0.5,
    backgroundColor: '#e3f0f3',
    title: 'Welcome to Our Platform',
    subtitle: 'The best solution for your business',
    description: 'Discover how our innovative platform can help you achieve your goals faster and more efficiently than ever before.',
  };

  @Output() buttonClick = new EventEmitter<JumbotronButton>();
  @Output() imageLoad = new EventEmitter<void>();
  @Output() imageError = new EventEmitter<Event>();
  @Output() dataChange = new EventEmitter<JumbotronDataModel>();

  @ContentChild(JumbotronContentComponent) customContent?: JumbotronContentComponent;
  @ContentChild(JumbotronActionsComponent) customActions?: JumbotronActionsComponent;

  signUp? = '/landing';

  constructor(
    private router: Router
  ) {  }

  get hasCustomContent(): boolean {
    return !!this.customContent;
  }

  get hasCustomActions(): boolean {
    return !!this.customActions;
  }

  onButtonClick(button: JumbotronButton): void {
    this.buttonClick.emit(button);
  
    this.router.navigate([button.url]);
  }

  onImageLoad(): void {
    this.imageLoad.emit();
  }

  onImageError(event: Event): void {
    this.imageError.emit(event);
  }

  updateData(newData: Partial<JumbotronDataModel>): void {
    this.data = { ...this.data, ...newData };
    this.dataChange.emit(this.data);
  }
}
