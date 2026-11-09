import { Component } from '@angular/core';
import { GuiDataService } from '../../services/gui-data-service';
import { ServiceScreenInterface } from '../../models/ui-x';
import { SERVICE_LINKS, ASSESSMENT_HREF, CONTACT_PHONE } from '../../core-comps/nav-links';

/** One-line pitch per service for the landing overview. */
const SERVICE_BLURBS: Record<string, string> = {
  '/protect': '4K cameras planned around your property and installed by certified technicians.',
  '/surveil': 'Live view, smart alerts and on-site plus cloud recording on any device.',
  '/monitor': 'Trained operators verify alarms on live video and dispatch help 24/7.',
  '/access':  'Keycards, mobile credentials and biometrics with a full audit trail.',
  '/drone':   'Automated aerial patrols for large and remote sites, where the law allows.',
};

@Component({
  selector: 'dvz-landing-pg',
  standalone: false,
  template: `
      <!-- <h1>Primary Services</h1>
      <div class="call2action-cards">
        @for (c2a_btn of c2a_btns$; track c2a_btn._id; let idx = $index, e = $even) {
            <drv-custom-card
                [id]="c2a_btn._id"
                class="c2a_btn"
                (click)="showDisjointedData('data' + idx)"
                [elevated]= false
                [cardData]= c2a_btn>
            </drv-custom-card>
        }
      </div> -->
      <section class="lp-services" aria-labelledby="lpServicesTitle">
        <p class="lp-eyebrow">Licensed &middot; Insured &middot; Serving the Tri-State area</p>
        <h2 id="lpServicesTitle">One local team to design, install and watch over your security.</h2>
        <p class="lp-lede">
          From a three-camera home setup to multi-site businesses, DaiRec Vision plans your coverage,
          installs it with certified technicians and keeps it running. Your equipment is leased, maintained
          and updated by us, so your system never falls behind.
        </p>
        <div class="lp-grid">
          @for (svc of services; track svc.route) {
            <a class="lp-tile" [routerLink]="svc.route">
              <span class="lp-icon" aria-hidden="true"><mat-icon>{{ svc.icon }}</mat-icon></span>
              <h3>{{ svc.label }}</h3>
              <p>{{ svc.blurb }}</p>
              <span class="lp-more">Explore <span aria-hidden="true">→</span></span>
            </a>
          }
        </div>
      </section>

      <section class="whyUsData" aria-label="Our services">
        @for (dsply of srvcDsplys$; track dsply._id; let idx = $index) {
            @if (idx < 2) {
                <article class="svc-card" [class.svc-card--dark]="idx === 1">
                    <h3>{{ dsply.title }}</h3>
                    @if (dsply.subtitle) {
                        <p class="svc-sub">{{ dsply.subtitle }}</p>
                    }
                    @if (dsply.content) {
                        <p class="svc-body">{{ dsply.content }}</p>
                    }
                    @if (dsply.rte) {
                        <a class="svc-link" [routerLink]="dsply.rte">Learn more <span aria-hidden="true">→</span></a>
                    }
                </article>
            }
        }
    </section>
      <div class="srvcDataDsply">
        @for (dsjntData of srvcDsplys$; track dsjntData._id; let idx = $index, e = $even, last = $last, first = $first) {
            @if (idx < 5) {
                @if (data2bDsplyd$ === 'data' + idx) {
                    <drv-jumbotron-component
                        [data]="{
                            title: dsjntData.title,
                            subtitle: dsjntData.subtitle,
                            description: dsjntData.desc,
                            content: dsjntData.content || 'Professional security design, installation and monitoring for homes and businesses across the Tri-State area.',
                            img: dsjntData.img && !dsjntData.img.includes('collage-image') ? dsjntData.img : '/assets/backgrounds/install-Bnr.webp',
                            imageAlt: dsjntData.name || 'Service Display Illustration',
                            backgroundColor: '#424040',
                            imagePosition: 'background',
                            compSize: 'large',
                            compType: 'banner',
                            buttons: [
                                { label: 'Get Started', url: '/plans', action: 'start', icon: 'rocket_launch', style: 'raised', color: 'primary' },
                                { label: 'Learn More', url: 'home', action: 'learn', icon: 'info', style: 'stroked', color: 'accent' }
                                
                            ],
                            overlay: true,
                        }"
                    
                    />
                }
                
            }
        }
      </div>

      <section class="lp-steps" aria-labelledby="lpStepsTitle">
        <p class="lp-eyebrow">How it works</p>
        <h2 id="lpStepsTitle">From first visit to fully protected in four steps.</h2>
        <ol class="lp-step-list">
          @for (step of steps; track step.title; let i = $index) {
            <li class="lp-step">
              <span class="lp-num" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </li>
          }
        </ol>
        <div class="lp-cta">
          <a class="lp-btn" [href]="assessmentHref">
            <mat-icon aria-hidden="true">event_available</mat-icon> Book your free assessment
          </a>
          <a class="lp-btn lp-btn--ghost" routerLink="/plans">See plans &amp; pricing</a>
          <span class="lp-phone">or call <a [href]="'tel:' + phoneDigits">{{ phone }}</a></span>
        </div>
        <p class="lp-fine">Free, no obligation. <a routerLink="/plans" fragment="assessment-terms">Terms apply.</a></p>
      </section>
      @if (showPromo) {
      <div class=promoBanner>
        <drv-custom-card
            title="Special Promotion"
            subtitle="Limited Time Offer"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="small"
            compType="banner">
        </drv-custom-card>
      </div>
      }
      
      @if (showTestimonials) {
      <div class="testimonialsData">
        @for (i of generateArray(8); track i; let idx = $index, e = $even, last = $last, first = $first) {
            @if (i < virtualLimit) {
                <drv-custom-card
                    class="testimonial-card"
                    title="title.idx"
                    subtitle="subtitle.idx"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    [elevated]= false
                    [isPlaceholder]="false"
                    compSize="small"
                    [compType]="'testimonial'">
                </drv-custom-card>
            }
        }
      </div>
      }
      @if (showPromo) {
      <div class=promoBanner>
        <drv-custom-card
            title="Special Promotion"
            subtitle="Limited Time Offer"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="medium"
            compType="banner">
        </drv-custom-card>
      </div>
      }
  `,
  styles: [`
    :host {
        width: 100%;
        margin: 0 0 90px;
        display: flex;
        flex-direction: column;
        justify-content:  space-between;
        text-align: center;
        h1:first-child {
            margin: 0 0 10px;
            text-align: left;
        }
    }
    div {
        margin: 0 0 20px;
    }

    // .call2action-cards as buttons
    .call2action-cards {
        display: inherit;
        max-height: 100px;
        height: 100px;
        width: inherit;
        margin: 20px 0;
    }
    .c2a_btn:not(:last-child):not(:first-child) {
        // background-color: purple;
        margin: 0 10px;
    }

    // .srvcDataDsply windows for cta and service display
    .srvcDataDsply {
        display: unset;
    }

    .promoBanner {
        display: flex;
        justify-content: center;
        .promo-banner {
            width: 100%;
        }
    }

      /* .whyUsData / .svc-card panels: shared styles in styles.scss */

    /* ---------- Services overview ---------- */
    .lp-eyebrow {
      margin: 0 0 0.5rem;
      color: var(--drv-green-deep);
      font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    }
    .lp-services, .lp-steps { margin: 0 0 3rem; }
    .lp-services h2, .lp-steps h2 {
      margin: 0 auto 1rem; max-width: 820px;
      color: var(--drv-navy); font-size: 2.1rem; line-height: 1.25;
    }
    .lp-lede {
      margin: 0 auto 2rem; max-width: 760px;
      color: var(--drv-text); font-size: 1.1rem; line-height: 1.7;
    }
    .lp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      text-align: left;
    }
    .lp-tile {
      display: flex; flex-direction: column;
      padding: 1.5rem 1.25rem;
      background: var(--drv-white);
      border: 1px solid var(--drv-line);
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 2px 6px rgba(26, 35, 50, 0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      h3 { margin: 0.9rem 0 0.4rem; color: var(--drv-navy); font-size: 1.1rem; }
      p { margin: 0 0 1rem; color: var(--drv-text); font-size: 0.95rem; line-height: 1.55; }
    }
    .lp-tile:hover, .lp-tile:focus-visible {
      transform: translateY(-3px);
      border-color: var(--drv-green);
      box-shadow: 0 12px 24px rgba(26, 35, 50, 0.1);
    }
    .lp-icon {
      display: inline-flex; align-items: center; justify-content: center;
      width: 48px; height: 48px; border-radius: 12px;
      background: linear-gradient(135deg, var(--drv-midnight) 0%, var(--drv-navy) 100%);
      box-shadow: inset 0 -3px 0 var(--drv-green);
      mat-icon { color: var(--drv-mint); }
    }
    .lp-more {
      margin-top: auto;
      color: var(--drv-green-deep); font-weight: 600; font-size: 0.9rem;
      span { display: inline-block; transition: transform 0.2s; }
    }
    .lp-tile:hover .lp-more span { transform: translateX(4px); }

    /* ---------- How it works ---------- */
    .lp-steps {
      padding: 2.75rem 2rem 2.25rem;
      border-radius: 18px;
      background: linear-gradient(135deg, var(--drv-mint-mist) 0%, var(--drv-cloud) 100%);
      border: 1px solid var(--drv-line);
    }
    .lp-step-list {
      list-style: none; padding: 0; margin: 2rem 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 1.5rem;
      text-align: left;
      counter-reset: none;
    }
    .lp-step {
      position: relative;
      h3 { margin: 0.9rem 0 0.4rem; color: var(--drv-navy); font-size: 1.1rem; }
      p { margin: 0; color: var(--drv-text); font-size: 0.95rem; line-height: 1.6; }
    }
    .lp-num {
      display: inline-flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--drv-green); color: var(--drv-on-green);
      font-weight: 700; font-size: 1.1rem;
      box-shadow: 0 0 0 6px rgba(46, 204, 113, 0.18);
    }
    .lp-cta {
      display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.9rem 1rem;
    }
    .lp-btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.8rem 1.4rem; border-radius: 999px;
      background: var(--drv-green); color: var(--drv-on-green);
      font-weight: 700; text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease;
      mat-icon { font-size: 20px; width: 20px; height: 20px; }
    }
    .lp-btn:hover { background: var(--drv-green-hover); transform: translateY(-1px); }
    .lp-btn--ghost {
      background: transparent; color: var(--drv-navy);
      box-shadow: inset 0 0 0 2px var(--drv-navy);
    }
    .lp-btn--ghost:hover { background: var(--drv-navy); color: var(--drv-white); }
    .lp-phone { color: var(--drv-muted); a { color: var(--drv-navy); font-weight: 600; } }
    .lp-fine { margin: 1rem 0 0; color: var(--drv-muted); font-size: 0.85rem; a { color: inherit; } }

    @media (max-width: 700px) {
      .lp-services h2, .lp-steps h2 { font-size: 1.6rem; }
      .lp-steps { padding: 2rem 1.25rem; }
    }

    .testimonialsData {
        display: flex;
        justify-content: space-between;
        .testimonial-card:not(:first-child) {
            // width: 23%;
            margin-left: 10px;
            // flex: 1;
        }
    }
    

  `],
})
export class LandingPg {
    /** Which service panel is shown (the landing page shows the first). */
    data2bDsplyd$ = 'data0';
    virtualLimit = 4;
    /** Hidden until there is a real, dated offer / real client reviews. */
    showPromo = false;
    showTestimonials = false;

    /** Services overview tiles (labels, icons and routes come from the site navigation). */
    readonly services = SERVICE_LINKS.map(link => ({
      label: link.label,
      route: link.route!,
      icon: link.icon!,
      blurb: SERVICE_BLURBS[link.route!] ?? link.desc ?? '',
    }));

    /** "How it works" steps. */
    readonly steps = [
      { title: 'Free on-site assessment',
        text: 'A certified technician walks your property, maps entry points and blind spots, and answers your questions. No cost, no obligation.' },
      { title: 'Your written plan & quote',
        text: 'Within 3–5 business days you receive a camera plan and quote, with placement, equipment and monthly plan spelled out.' },
      { title: 'Professional installation',
        text: 'Clean, concealed cabling, every camera and recorder configured, and a walkthrough of the app before we leave.' },
      { title: 'Protected & supported',
        text: 'Watch from anywhere, add 24/7 monitoring with a plan, and let us handle maintenance, updates and repairs.' },
    ];

    readonly assessmentHref = ASSESSMENT_HREF;
    readonly phone = CONTACT_PHONE;
    readonly phoneDigits = '+1' + CONTACT_PHONE.replace(/\D/g, '');

    constructor(private uis: GuiDataService) {}

    /** Service panels, read live from the data service. */
    get srvcDsplys$(): ServiceScreenInterface[] {
        return this.uis.allSrvcScrnData$();
    }

    generateArray(n: number): number[] {
        return [...Array(n).keys()];
    }
}
