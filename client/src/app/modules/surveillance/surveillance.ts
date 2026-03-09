import { Component } from '@angular/core';

@Component({
  selector: 'drv-surveillance',
  standalone: false,
  template: `
    <p>
      surveillance works!
    </p>
    <a routerLink="monitor">Go to Remote Monitoring</a>
  `,
  styles: ``,
})
export class Surveillance {

}
