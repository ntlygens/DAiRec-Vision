import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  selector: 'drv-breadcrumbs',
  standalone: false,
  template: `
    <nav>
      <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
        <ng-container *ngIf="!last">
          <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a> &gt;
        </ng-container>
        <ng-container *ngIf="last">
          {{ breadcrumb.label }}
        </ng-container>
      </ng-container>
    </nav>
  `,
  styles: ``,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string, url: string }> = [];
  constructor(private breadcrumbService: BreadcrumbService) { }
  
  ngOnInit(): void {  
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;
    // this.breadcrumbs = [{label: 'Home', url: '/'}];
    console.log('Breadcrumbs comp:', this.breadcrumbs);
  }

}
