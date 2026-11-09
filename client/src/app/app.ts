import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreCompsModule } from './core-comps/core-comps-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreCompsModule],
  template: `
  <main class="app">
    <drv-header-bar />
    <router-outlet></router-outlet>
    <drv-footer-bar />
  </main>
  `,
  styles: [`
    
    .app {
      display: flex;
      flex-direction: column;
      justify-content: center; 

      align-items: center;
      gap: 1rem;

      padding: 10px 20px 0;
      margin: 0;
    }
    /* Header host uses display: contents (see header-bar.ts) so its nav can stick to the top of the page. */
    drv-footer-bar {
      /* full-bleed: cancel .app side padding */
      width: calc(100% + 40px);
      margin: 3rem -20px 0;
    }

  `]
})
export class App {}
