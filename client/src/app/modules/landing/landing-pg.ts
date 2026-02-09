import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dvz-landing-pg',
  standalone: false,
  template: `
      <h1>Landing Page</h1>
      <button id="button" (click)="goHome('home')" mat-button>Go to Home</button>
  `,
  styles: [`
    
  `],
})
export class LandingPg {
    constructor(
        private router: Router
    ) { }

    goHome(data?: any) {
        // Navigate to the home page
        // window.location.href = 'home';
        this.router.navigate([`${data}`]);
    }
}
