import { Component, signal, OnInit, HostListener } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { ASSESSMENT_HREF, MAIN_LINKS, SERVICE_LINKS } from './nav-links';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'drv-header-bar',
  standalone: false,
  template: `
    <header class="site-nav" [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <a class="brand" routerLink="/" (click)="closeMenu()">
          <img src="/assets/core/logo/iLogo@0.1x.png" alt="DaiRec Vision Security logo" />
          <span>DaiRec <strong>Vision</strong></span>
        </a>

        <!-- Desktop links -->
        <nav class="links" aria-label="Main">
          <a [routerLink]="mainLinks[0].route" routerLinkActive="active">{{ mainLinks[0].label }}</a>

          <button class="link-btn" [class.active]="servicesActive()" [matMenuTriggerFor]="servicesMenu">
            Services <mat-icon>expand_more</mat-icon>
          </button>
          <mat-menu #servicesMenu="matMenu" class="drv-services-menu" xPosition="after">
            @for (s of serviceLinks; track s.route) {
              <a mat-menu-item [routerLink]="s.route" routerLinkActive="menu-active" [routerLinkActiveOptions]="{ exact: true }">
                <mat-icon>{{ s.icon }}</mat-icon>
                <span class="menu-text">
                  <span class="menu-label">{{ s.label }}</span>
                  <span class="menu-desc">{{ s.desc }}</span>
                </span>
              </a>
            }
          </mat-menu>

          @for (l of mainLinks.slice(1); track l.label) {
            @if (l.route) {
              <a [routerLink]="l.route" routerLinkActive="active">{{ l.label }}</a>
            } @else {
              <a [href]="l.href">{{ l.label }}</a>
            }
          }
        </nav>

        <a class="cta" [href]="assessmentHref">Free Assessment</a>

        <!-- Mobile toggle -->
        <button class="burger" mat-icon-button
          [attr.aria-expanded]="menuOpen()" aria-controls="mobile-menu"
          [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'"
          (click)="menuOpen.set(!menuOpen())">
          <mat-icon>{{ menuOpen() ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      <!-- Mobile panel -->
      @if (menuOpen()) {
        <nav id="mobile-menu" class="mobile" aria-label="Mobile">
          <a [routerLink]="mainLinks[0].route" routerLinkActive="active" (click)="closeMenu()">
            <mat-icon>{{ mainLinks[0].icon }}</mat-icon>{{ mainLinks[0].label }}
          </a>
          <span class="mobile-group">Services</span>
          @for (s of serviceLinks; track s.route) {
            <a class="sub" [routerLink]="s.route" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">
              <mat-icon>{{ s.icon }}</mat-icon>{{ s.label }}
            </a>
          }
          @for (l of mainLinks.slice(1); track l.label) {
            @if (l.route) {
              <a [routerLink]="l.route" routerLinkActive="active" (click)="closeMenu()"><mat-icon>{{ l.icon }}</mat-icon>{{ l.label }}</a>
            } @else {
              <a [href]="l.href" (click)="closeMenu()"><mat-icon>{{ l.icon }}</mat-icon>{{ l.label }}</a>
            }
          }
          <a class="cta mobile-cta" [href]="assessmentHref" (click)="closeMenu()">Get a Free Assessment</a>
        </nav>
      }
    </header>

    @if (showHero()) {
      <drv-hero-banner />
    } @else {
    <drv-jumbotron-component
      class="jumbo-tron"
      [data]="{
        title: title(),
        subtitle: subtitle(),
        img: img(),
        imageAlt: 'AI Vision Illustration',
        backgroundColor: '#d1eeff',
        imagePosition: 'background',
        compSize: 'medium',
        compType: 'feature',
        overlay: true,
      }"
      (buttonClick)="handleJumbotronButtonClick($event)"
      (imageLoad)="handleJumbotronImageLoad()">
    </drv-jumbotron-component>
    }
  `,
  styles: [`
    /* contents: lets .site-nav stick relative to the whole page, not just this host */
    :host { display: contents; }

    .jumbo-tron { width: 100%; }

    .site-nav {
      /* full-bleed: cancel .app padding */
      width: calc(100% + 40px);
      margin: -10px -20px 0;
      box-sizing: border-box;
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(26, 35, 50, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      transition: box-shadow 0.25s, background 0.25s;
    }
    .site-nav.scrolled {
      background: rgba(26, 35, 50, 0.98);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
    }
    .nav-inner {
      max-width: 1280px;
      margin: 0 auto;
      height: 68px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      color: #fff;
      text-decoration: none;
      font-size: 1.35rem;
      letter-spacing: 0.01em;
      white-space: nowrap;
      img { height: 40px; width: auto; }
      strong { color: #2ecc71; font-weight: 700; }
    }

    .links {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-left: auto;
    }
    .links a, .link-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 0.55rem 0.9rem;
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      font: 500 0.98rem/1 Roboto, 'Helvetica Neue', sans-serif;
      background: none;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: color 0.2s, background 0.2s;
      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }
    .links a:hover, .link-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.08); }
    .links a.active, .link-btn.active { color: #fff; }
    .links a.active::after, .link-btn.active::after {
      content: '';
      position: absolute;
      left: 0.9rem; right: 0.9rem; bottom: 2px;
      height: 2px;
      border-radius: 2px;
      background: #2ecc71;
    }

    .cta {
      padding: 0.6rem 1.15rem;
      background: #2ecc71;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 999px;
      white-space: nowrap;
      transition: background 0.2s, transform 0.2s;
    }
    .cta:hover { background: #27ae60; transform: translateY(-1px); }

    .burger { display: none; color: #fff; margin-left: auto; }

    .mobile {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 20px 1.25rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      animation: slideDown 0.2s ease-out;
      a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.8rem 0.5rem;
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        font-size: 1.05rem;
        border-radius: 8px;
      }
      a.sub { padding-left: 1.5rem; font-size: 1rem; }
      a.active { color: #2ecc71; background: rgba(46, 204, 113, 0.08); }
      mat-icon { color: #2ecc71; }
    }
    .mobile-group {
      margin: 0.75rem 0.5rem 0.25rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .mobile .mobile-cta { justify-content: center; margin-top: 0.75rem; color: #fff; }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

    @media (max-width: 960px) {
      .links, .nav-inner > .cta { display: none; }
      .burger { display: inline-flex; }
    }
  `],
})
export class HeaderBar implements OnInit {

  protected readonly title = signal('DAiRec-Vision Client');
  protected readonly subtitle = signal('our gateway to AI-driven insights');
  protected readonly img = signal('');
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly servicesActive = signal(false);
  /** Landing and home use the animated hero banner; other pages keep their image jumbotron. */
  protected readonly showHero = signal(true);

  protected readonly mainLinks = MAIN_LINKS;
  protected readonly serviceLinks = SERVICE_LINKS;
  protected readonly assessmentHref = ASSESSMENT_HREF;

  protected brdCrumb: Breadcrumb[] = [];
  protected brdCrumbLabel: string = '';

  constructor(
    private bCrumbSrvc: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        this.brdCrumb = this.bCrumbSrvc.createBreadcrumbs(this.activatedRoute.root);
        this.brdCrumbLabel = this.brdCrumb[0]?.url || '';
        this.servicesActive.set(SERVICE_LINKS.some(s => this.router.url.startsWith(s.route!)));
        const path = this.router.url.split(/[?#]/)[0];
        this.showHero.set(path === '/' || path === '' || path === '/home');
        this.setPgBnrImg(path === '/surveil/monitor' ? path : this.brdCrumbLabel);
      });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(typeof window !== 'undefined' && window.scrollY > 8);
  }

  @HostListener('document:keydown.escape')
  closeMenu() {
    this.menuOpen.set(false);
  }

  setPgBnrImg(uri: string): void {
    switch (uri) {
      case '':
        this.img.set('/assets/backgrounds/landing-Bnr.webp');
        this.title.set('DAiRec-Vision Security');
        this.subtitle.set('Your gateway to AI-driven insights!');
        break;
      case '/home':
        this.img.set('/assets/backgrounds/home-Bnr.webp');
        this.title.set('Protect What Matters Most');
        this.subtitle.set('Advanced Security Solutions for Your Home & Business');
        break;
      case '/protect':
        this.img.set('/assets/backgrounds/install-Bnr.webp');
        this.title.set('CCTV & IP Camera Service');
        this.subtitle.set('See Everything. Miss Nothing. Protect What Matters.');
        break;
      case '/surveil':
        this.img.set('/assets/backgrounds/surveil-Bnr.webp');
        this.title.set('Video Surveillance & Remote Monitoring');
        this.subtitle.set('Never Be In The Dark. Always Be In Control.');
        break;
      case '/access':
        this.img.set('/assets/backgrounds/access-Bnr.webp');
        this.title.set('Access Control Systems');
        this.subtitle.set('Control Who Enters. Track Who Leaves. Secure Every Access Point.');
        break;
      case '/surveil/monitor':
        this.img.set('/assets/backgrounds/surveil-Bnr.webp');
        this.title.set('Remote Monitoring');
        this.subtitle.set('Your Property, Live. Anytime, Anywhere.');
        break;
      case '/drone':
        this.img.set('/assets/backgrounds/surveil-Bnr.webp');
        this.title.set('Automated Drone Surveillance');
        this.subtitle.set('Eyes in the Sky. On Patrol Before You Ask.');
        break;
      case '/plans':
        this.img.set('/assets/backgrounds/home-Bnr.webp');
        this.title.set('Plans & Pricing');
        this.subtitle.set('Security for Homes, Businesses & Enterprise Sites');
        break;
      default:
        this.img.set('/assets/backgrounds/home-Bnr.webp');
    }
  }

  handleJumbotronButtonClick(event: any) {
    console.log('Jumbotron button clicked:', event);
  }

  handleJumbotronImageLoad() {
    console.log('Jumbotron image loaded successfully.');
  }
}
