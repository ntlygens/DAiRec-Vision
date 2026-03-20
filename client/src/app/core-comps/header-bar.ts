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
      <img src="/assets/core/logo/iLogo@0.1x.png" /><h1>DAiRec Vision Security Systems & Services</h1>
    </mat-toolbar>
    <drv-jumbotron-component
      class="jumbo-tron"
      [data]="{
        title: title(),
        subtitle: subtitle(),
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

      img {
        max-height: 45px;
      }
    }  

  `],
})
export class HeaderBar implements OnInit{
  
  protected readonly title = signal('DAiRec-Vision Client');
  protected readonly subtitle = signal('our gateway to AI-driven insights');
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
        this.setPgBnrImg(this.brdCrumbLabel);
        console.log('Updated Breadcrumbs hdr:', this.brdCrumbLabel);
    });
  }

  setPgBnrImg(uri: string): void {
    switch (uri) {
      case '':
        this.imageUrl.set('/assets/backgrounds/landing-Bnr.png');
        this.title.set('DAiRec-Vision Security');
        this.subtitle.set('Your gateway to AI-driven insights!');
        break;
      case '/home':
        this.imageUrl.set('/assets/backgrounds/home-Bnr.png');
        this.title.set('Protect What Matters Most');
        this.subtitle.set('Advanced Security Solutions for Your Home & Business');
        break;
      case '/protect':
        this.imageUrl.set('/assets/backgrounds/install-Bnr.png');
        this.title.set('CCTV & IP Camera Service');
        this.subtitle.set('See Everything. Miss Nothing. Protect What Matters.');
        break;
      case '/surveil':
        this.imageUrl.set('/assets/backgrounds/surveil-Bnr.png');
        this.title.set('Video Surveillance & Remote Monitoring');
        this.subtitle.set('Never Be In The Dark. Always Be In Control.');
        break;
      case '/access':
        this.imageUrl.set('/assets/backgrounds/access-Bnr.png');
        this.title.set('Access Control Systems');
        this.subtitle.set('Control Who Enters. Track Who Leaves. Secure Every Access Point.');
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
