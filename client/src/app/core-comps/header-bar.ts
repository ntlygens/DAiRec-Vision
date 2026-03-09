import { Component, signal, OnInit } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { last } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

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
export class HeaderBar implements OnInit{
  
  protected readonly title = signal('DAiRec-Vision Client');
  protected readonly imageUrl = signal('');
  protected brdCrumb: Breadcrumb[] = [];
  protected brdCrumbLabel: string = '';

  constructor(
    private bCrumbSrvc: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  
  ){}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.brdCrumb = this.bCrumbSrvc.createBreadcrumbs(this.activatedRoute.root);
        this.brdCrumbLabel = this.brdCrumb[0].url || '';
        this.setPgBnrImg();
        console.log('Updated Breadcrumbs hdr:', this.brdCrumbLabel);
    });
  }

  setPgBnrImg() {
    switch (this.brdCrumbLabel) {
      case '':
        this.imageUrl.set('/assets/backgrounds/landing-Bnr.png');
        break;
      case '/home':
        this.imageUrl.set('/assets/backgrounds/home-Bnr.png');
        break;
      case '/protect':
        this.imageUrl.set('/assets/backgrounds/install-Bnr.png');
        break;
      case '/surveil':
        this.imageUrl.set('/assets/backgrounds/surveil-Bnr.png');
        break;
      case '/access':
        this.imageUrl.set('/assets/backgrounds/access-Bnr.png');
        break;
      default:
        this.imageUrl.set('/assets/backgrounds/home-Bnr.png');
    }
  }

  handleJumbotronButtonClick(event: any) {
    console.log('Jumbotron button clicked:', event);
    // Implement your logic here, e.g., navigate to a different page or show a modal
  }

  handleJumbotronImageLoad() {
    console.log('Jumbotron image loaded successfully.');
    // You can perform additional actions here if needed, such as hiding a loading spinner
  } 

}
