import { Component, signal } from '@angular/core';

@Component({
  selector: 'drv-header-bar',
  standalone: false,
  template: `
    <mat-toolbar color="primary">
      <h1>Welcome to {{ title() }}!</h1>
    </mat-toolbar>
    <drv-jumbotron-component
      class="jumbo-tron"
      [data]="{
        title: title(),
        subtitle: 'Your gateway to AI-driven insights',
        description: 'Explore the power of AI with our intuitive interface. Get started by navigating through the features and tools designed to help you harness the full potential of your data.',
        imageUrl: imageUrl(),
        imageAlt: 'AI Vision Illustration',
        backgroundColor: '#d1eeff',
        imagePosition: 'background',
        compSize: 'small',
        compType: 'feature',
        overlay: true,
      }"
      (buttonClick)="handleJumbotronButtonClick($event)"
      (imageLoad)="handleJumbotronImageLoad()">
    </drv-jumbotron-component>
  `,
  styles: [`
    // $blankIntroBkgd: url("/assets/backgrounds/collage-image-1.jpg") no-repeat center center;
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      opacity: 0.95;
      justify-content: center;
    }  
    .jumbo-tron { }

  `],
})
export class HeaderBar {
  protected readonly title = signal('DAiRec-Vision Client');
  protected readonly imageUrl = signal('/assets/backgrounds/collage-image-1.jpg');

  handleJumbotronButtonClick(event: any) {
    console.log('Jumbotron button clicked:', event);
    // Implement your logic here, e.g., navigate to a different page or show a modal
  }

  handleJumbotronImageLoad() {
    console.log('Jumbotron image loaded successfully.');
    // You can perform additional actions here if needed, such as hiding a loading spinner
  } 

}
