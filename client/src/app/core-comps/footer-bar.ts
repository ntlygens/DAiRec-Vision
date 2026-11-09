import { Component } from '@angular/core';
import { CONTACT_EMAIL, CONTACT_PHONE, MAIN_LINKS, SERVICE_LINKS } from './nav-links';

@Component({
  selector: 'drv-footer-bar',
  standalone: false,
  template: `
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="col brand-col">
          <a class="brand" routerLink="/">
            <img src="/assets/core/logo/iLogo@0.1x.png" alt="" />
            <span>DaiRec <strong>Vision</strong></span>
          </a>
          <p>Surveillance, access control and automated drone security for homes, businesses and enterprise sites.</p>
        </div>

        <nav class="col" aria-label="Services">
          <h4>Services</h4>
          @for (s of serviceLinks; track s.route) {
            <a [routerLink]="s.route">{{ s.label }}</a>
          }
        </nav>

        <nav class="col" aria-label="Company">
          <h4>Company</h4>
          @for (l of mainLinks; track l.label) {
            @if (l.route) {
              <a [routerLink]="l.route">{{ l.label }}</a>
            } @else {
              <a [href]="l.href">{{ l.label }}</a>
            }
          }
        </nav>

        <div class="col">
          <h4>Contact</h4>
          <a [href]="'mailto:' + email"><mat-icon>mail</mat-icon>{{ email }}</a>
          <a [href]="telHref"><mat-icon>call</mat-icon>{{ phone }}</a>
          <span class="hours"><mat-icon>schedule</mat-icon>Mon–Fri 8am–6pm · Sat 9am–4pm</span>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ year }} DaiRec Vision Security. All rights reserved.</span>
        <span>Licensed &amp; Insured</span>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .site-footer {
      background: var(--drv-midnight);
      color: rgba(255, 255, 255, 0.75);
      padding: 3.5rem 20px 1.5rem;
      border-top: 3px solid var(--drv-green);
    }
    .footer-grid {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 2.5rem;
    }
    .col { display: flex; flex-direction: column; gap: 0.6rem; }
    h4 {
      color: #fff;
      margin: 0 0 0.4rem;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    a, .hours {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      transition: color 0.2s;
      mat-icon { font-size: 18px; width: 18px; height: 18px; color: var(--drv-green); }
    }
    a:hover { color: var(--drv-green); }
    .brand {
      color: #fff;
      font-size: 1.35rem;
      img { height: 36px; width: auto; }
      strong { color: var(--drv-green); }
    }
    .brand-col p { line-height: 1.6; margin: 0.25rem 0 0; max-width: 34ch; }
    .footer-bottom {
      max-width: 1280px;
      margin: 2.5rem auto 0;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.88rem;
      color: rgba(255, 255, 255, 0.5);
    }
    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) {
      .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    }
  `],
})
export class FooterBar {
  protected readonly serviceLinks = SERVICE_LINKS;
  protected readonly mainLinks = MAIN_LINKS;
  protected readonly email = CONTACT_EMAIL;
  protected readonly phone = CONTACT_PHONE;
  protected readonly telHref = 'tel:' + CONTACT_PHONE.replace(/[^0-9+]/g, '');
  protected readonly year = new Date().getFullYear();
}
