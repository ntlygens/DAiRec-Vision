import { Component } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'dvz-home-pg',
  standalone: false,
  template: `
    <p>
      home-pg works!
    </p>
    <button mat-button (click)="onButtonClick()">Go to Landing</button>
  `,
  styles: ``,
})

export class HomePg {

  constructor(
    private router: Router
  ) { 
  }

  onButtonClick() {
    this.router.navigate(['/']);
    console.log('Button clicked!');
  }
}
