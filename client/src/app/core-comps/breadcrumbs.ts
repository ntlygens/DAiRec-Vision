import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, last } from 'rxjs/operators';


interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'drv-breadcrumbs',
  standalone: false,
  template: `
    <nav>
      @for (breadcrumb of breadcrumbs; track breadcrumb.url + idx; let idx = $index; let last = $last) {
        <ng-container>
          @if (!last ) {
            @if (breadcrumb.url !== '/home' && breadcrumb.url !== '') {
              <ng-container>
                <!-- <a routerLink="home">{{ breadcrumb.label }}</a> &gt; -->
                <!-- below uses the dynamic value of var 'url' for HOME link -->
                <a routerLink='home'>{{ breadcrumb.label }}</a> &gt;
              </ng-container>
            } 
          }
          @if (last) {
            <ng-container>
              {{ breadcrumb.label }}
            </ng-container>
          }
        </ng-container>
      }
    </nav>
  `,
  styles: ``, 
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  // breadcrumbs: Array<{ label: string, url: string }> = [];
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private breadcrumbService: BreadcrumbService
  ) { }
  
  ngOnInit(): void { 
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root);
        // this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        console.log('Updated Breadcrumbs:', this.breadcrumbs);
    }); 
   
  }
          

}
