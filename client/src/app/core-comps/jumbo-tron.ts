// jumbotron.component.ts
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// Interface for Jumbotron data
export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
}

export interface JumbotronDataModel {
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  buttons?: JumbotronButton[];
  theme?: 'primary' | 'accent' | 'warn' | 'light' | 'dark';
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
  compType?: CompType | string;
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
      [class.theme-primary]="data.theme === 'primary'"
      [class.theme-accent]="data.theme === 'accent'"
      [class.theme-warn]="data.theme === 'warn'"
      [class.theme-light]="data.theme === 'light'"
      [class.theme-dark]="data.theme === 'dark'"
      [class.layout-left]="data.imagePosition === 'left'"
      [class.layout-right]="data.imagePosition === 'right'"
      [class.layout-top]="data.imagePosition === 'top'"
      [class.layout-bottom]="data.imagePosition === 'bottom'"
      [style.height]="data.height || 'auto'"
      [style.background-color]="data.imagePosition === 'background' ? data.backgroundColor : null"
      [style.background-image]="data.imagePosition === 'background' ? 'url(' + data.imageUrl + ')' : null">

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
    @if (data.imageUrl && data.imagePosition !== 'background') {
      <div
        class="jumbotron-image">
        <img
          [src]="data.imageUrl"
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
      min-height: 500px;
      background-attachment: fixed;
      button {
        color: white;
        background: rgba(250, 250, 250, 0.25);

      }
    }
    .jumbotron-container.isTestimonial {
      background-attachment: unset;
    }
    .jumbotron-container.isBanner {
      background-attachment: unset;
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .theme-accent {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }

    .theme-warn {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      color: white;
    }

    .theme-light {
      background: #f5f5f5;
      color: #333;
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

  get hasCustomContent(): boolean {
    return !!this.customContent;
  }

  get hasCustomActions(): boolean {
    return !!this.customActions;
  }

  onButtonClick(button: JumbotronButton): void {
    this.buttonClick.emit(button);
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

// Example usage component
@Component({
  selector: 'drv-jumbotron-demo',
  standalone: true,
  imports: [
    JumboTronComponent,
    JumbotronContentComponent,
    JumbotronActionsComponent,
    MatButtonModule,
    MatIconModule,
    CommonModule,
],
  template: `
    <div class="demo-container">
      <h1>Jumbotron Component Demo</h1>
    
      <!-- Example 1: Basic with data binding -->
      <h2>1. Basic Jumbotron (Left Image)</h2>
      <drv-jumbotron-component
        [data]="basicData"
        (buttonClick)="handleButtonClick($event)"
        (imageLoad)="handleImageLoad()">
      </drv-jumbotron-component>
    
      <!-- Example 2: Background Image -->
      <h2>2. Background Image with Overlay</h2>
      <drv-jumbotron-component [data]="backgroundData"></drv-jumbotron-component>
    
      <!-- Example 3: Custom Content -->
      <h2>3. Custom Content & Actions</h2>
      <drv-jumbotron-component
        [data]="customData"
        (buttonClick)="handleCustomAction($event)">
        <drv-jumbotron-content>
          <div class="custom-content">
            <h1>🚀 Custom Content Example</h1>
            <p>This content is completely custom and projected into the jumbotron.</p>
            <ul>
              <li>Dynamic data binding</li>
              <li>Custom layouts</li>
              <li>Event emitters</li>
            </ul>
          </div>
        </drv-jumbotron-content>
        <drv-jumbotron-actions>
          <button mat-raised-button color="primary" (click)="customAction1()">
            <mat-icon>star</mat-icon>
            Custom Action 1
          </button>
          <button mat-stroked-button color="accent" (click)="customAction2()">
            <mat-icon>favorite</mat-icon>
            Custom Action 2
          </button>
        </drv-jumbotron-actions>
      </drv-jumbotron-component>
    
      <!-- Example 4: Top Image Layout -->
      <h2>4. Top Image Layout</h2>
      <drv-jumbotron-component [data]="topImageData"></drv-jumbotron-component>
    
      <!-- Example 5: Themed Jumbotrons -->
      <h2>5. Different Themes</h2>
      <div class="theme-grid">
        <drv-jumbotron-component [data]="themeData1"></drv-jumbotron-component>
        <drv-jumbotron-component [data]="themeData2"></drv-jumbotron-component>
      </div>
    
      <!-- Output Display -->
      @if (lastAction) {
        <div class="output">
          <h3>Last Action:</h3>
          <pre>{{ lastAction | json }}</pre>
        </div>
      }
    </div>
    `,
  styles: [`
    .demo-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      color: #333;
      margin-bottom: 32px;
    }

    h2 {
      color: #666;
      margin: 48px 0 24px 0;
      font-size: 1.5rem;
    }

    drv-jumbotron-component {
      margin-bottom: 24px;
      display: block;
    }

    .custom-content {
      padding: 24px 0;
    }

    .custom-content ul {
      margin: 16px 0;
      padding-left: 24px;
    }

    .custom-content li {
      margin: 8px 0;
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .output {
      margin-top: 48px;
      padding: 24px;
      background: #f5f5f5;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .output h3 {
      margin-top: 0;
      color: #333;
    }

    .output pre {
      background: white;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }

    @media (max-width: 768px) {
      .theme-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class JumbotronDemoComponent {
  lastAction: any = null;

  basicData: JumbotronDataModel = {
    title: 'Welcome to Our Platform',
    subtitle: 'The best solution for your business',
    description: 'Discover how our innovative platform can help you achieve your goals faster and more efficiently than ever before.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    imageAlt: 'Team collaboration',
    imagePosition: 'left',
    theme: 'light',
    buttons: [
      { label: 'Get Started', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
      { label: 'Learn More', action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
    ]
  };

  backgroundData: JumbotronDataModel = {
    title: 'Experience the Future',
    subtitle: 'Innovation meets excellence',
    description: 'Join thousands of satisfied customers who have transformed their business with our cutting-edge solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    imagePosition: 'background',
    overlay: true,
    overlayOpacity: 0.6,
    height: '500px',
    buttons: [
      { label: 'Start Free Trial', action: 'trial', icon: 'celebration', style: 'raised', color: 'accent' }
    ]
  };

  customData: JumbotronDataModel = {
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    imagePosition: 'right',
    theme: 'light'
  };

  topImageData: JumbotronDataModel = {
    title: 'Top Image Layout',
    subtitle: 'Perfect for showcasing products',
    description: 'This layout places the image at the top, creating a card-like appearance ideal for product displays or featured content.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop',
    imagePosition: 'top',
    theme: 'light',
    buttons: [
      { label: 'View Products', action: 'products', icon: 'shopping_cart', style: 'raised', color: 'primary' }
    ]
  };

  themeData1: JumbotronDataModel = {
    title: 'Primary Theme',
    subtitle: 'Bold and confident',
    description: 'Make a statement with vibrant gradients.',
    theme: 'primary',
    height: '300px',
    buttons: [
      { label: 'Explore', action: 'explore1', style: 'flat' }
    ]
  };

  themeData2: JumbotronDataModel = {
    title: 'Accent Theme',
    subtitle: 'Eye-catching design',
    description: 'Stand out with beautiful color schemes.',
    theme: 'accent',
    height: '300px',
    buttons: [
      { label: 'Discover', action: 'explore2', style: 'flat' }
    ]
  };

  handleButtonClick(button: JumbotronButton): void {
    this.lastAction = {
      type: 'Button Click',
      action: button.action,
      label: button.label,
      timestamp: new Date().toISOString()
    };
    console.log('Button clicked:', button);
  }

  handleImageLoad(): void {
    console.log('Image loaded successfully');
  }

  handleCustomAction(button: JumbotronButton): void {
    this.lastAction = {
      type: 'Custom Action',
      action: button.action,
      timestamp: new Date().toISOString()
    };
  }

  customAction1(): void {
    this.lastAction = {
      type: 'Custom Action 1',
      message: 'Custom action button clicked',
      timestamp: new Date().toISOString()
    };
  }

  customAction2(): void {
    this.lastAction = {
      type: 'Custom Action 2',
      message: 'Another custom action triggered',
      timestamp: new Date().toISOString()
    };
  }
}
