import { Component, signal, OnInit, HostListener, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ASSESSMENT_HREF, MAIN_LINKS, SERVICE_LINKS } from './nav-links';
import { HERO_PAGES, HeroPage } from './hero-scenes';

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

    <drv-hero-banner [page]="heroPage()" />
  `,
  styles: [`
    /* contents: lets .site-nav stick relative to the whole page, not just this host */
    :host { display: contents; }


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
      strong { color: var(--drv-green); font-weight: 700; }
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
      background: var(--drv-green);
    }

    .cta {
      padding: 0.6rem 1.15rem;
      background: var(--drv-green);
      color: var(--drv-on-green);
      text-decoration: none;
      font-weight: 600;
      border-radius: 999px;
      white-space: nowrap;
      transition: background 0.2s, transform 0.2s;
    }
    .cta:hover { background: var(--drv-green-hover); transform: translateY(-1px); }

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
      a.active { color: var(--drv-green); background: rgba(46, 204, 113, 0.08); }
      mat-icon { color: var(--drv-green); }
    }
    .mobile-group {
      margin: 0.75rem 0.5rem 0.25rem;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .mobile .mobile-cta { justify-content: center; margin-top: 0.75rem; color: var(--drv-on-green); }
    @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

    @media (max-width: 960px) {
      .links, .nav-inner > .cta { display: none; }
      .burger { display: inline-flex; }
    }
  `],
})
export class HeaderBar implements OnInit {

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly servicesActive = signal(false);
  /** Animated banner for the current page (falls back to the landing banner). */
  protected readonly heroPage = signal<HeroPage>(HERO_PAGES['/']);

  protected readonly mainLinks = MAIN_LINKS;
  protected readonly serviceLinks = SERVICE_LINKS;
  protected readonly assessmentHref = ASSESSMENT_HREF;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.closeMenu();
        const path = this.router.url.split(/[?#]/)[0] || '/';
        this.servicesActive.set(SERVICE_LINKS.some(s => path.startsWith(s.route!)));
        this.heroPage.set(HERO_PAGES[path] ?? HERO_PAGES['/']);
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
}
