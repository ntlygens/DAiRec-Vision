import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreCompsModule } from './core-comps/core-comps-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreCompsModule],
  template: `
  <main class="app">
    <drv-header-bar />
    <drv-breadcrumbs />
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

      padding: 10px 20px;
      margin: 0 0 3rem;
    }
    drv-header-bar, drv-footer-bar {
      width: 100%;
    }
    drv-footer-bar {
      position: sticky;
      bottom: 0;
    }

    router-outlet {
      width: 100%;
      padding: 10px 20px;
    }
  `]
})
export class App {
  // protected readonly title = signal('d-client');
}
