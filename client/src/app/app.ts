import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <main class="app">
    <h1>{{ title() }}</h1>
    <router-outlet></router-outlet>
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
  `]
})
export class App {
  protected readonly title = signal('d-client');
}
