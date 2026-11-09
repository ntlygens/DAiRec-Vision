import { Component } from '@angular/core';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';

@Component({
  selector: 'drv-protection',
  standalone: false,
  template: `
    <div class="dTextData">
        <h2>Why Choose Professional Installation?</h2>
        <p>
            Your property deserves eyes that never blink. DaiRec Vision Security designs and installs 4K CCTV and
            IP camera systems that eliminate blind spots and deliver crystal-clear video, day or night.
        </p>
        <p>
            Every system is planned around your property's layout and risks, installed by certified technicians,
            and set up so you can watch live and review footage from any device.
        </p>
    </div>
    <div class="prdctGrid">
      @for(pPrdcts of protectedPrdcts$; track pPrdcts._id) {
        @if (pPrdcts.compType?.toString() === "product") {
          <drv-custom-card
            [id]="pPrdcts._id"
            [clickable]="true"
            [elevated]="true"
            [compSize]="pPrdcts.compSize?.toString()"
            [compType]="pPrdcts.compType?.toString()"
            [cardData]="pPrdcts">
          </drv-custom-card>
        }
      }
    </div>
    @if (showPromo) {
    <div #promoBnr id=promoBnr class=promoBanner>
        <drv-custom-card
            title="Ready to Secure Your Property?"
            subtitle="Get a free consultation and custom security assessment today"
            content="Get 20% off on all our services! Use code PROMO20 at checkout. Don't miss out on this exclusive deal to elevate your experience with us."
            imageAlt="Promotion Banner"
            compSize="small"
            compType="banner">
        </drv-custom-card>
    </div>
    }
    <section class="whyUsData" aria-label="Why professional installation">
      @for (pArtcl of articles; track pArtcl._id; let idx = $index) {
        @if (idx < 2) {
          <article class="svc-card" [class.svc-card--dark]="idx === 1">
            <h3>{{ pArtcl.title }}</h3>
            @if (pArtcl.subtitle) {
              <p class="svc-sub">{{ pArtcl.subtitle }}</p>
            }
            @if (pArtcl.content) {
              <p class="svc-body">{{ pArtcl.content }}</p>
            }
            <a class="svc-link" [routerLink]="links[idx].route" [fragment]="links[idx].fragment">
              {{ links[idx].label }} <span aria-hidden="true">→</span>
            </a>
          </article>
        }
      }
    </section>
    <div class=promoBanner>
        <drv-custom-card
            title="Stop Wondering. Start Watching."
            subtitle="Free on-site security assessment"
            content="A certified technician maps your coverage, entry points and blind spots, and you receive a written camera plan and quote within 3–5 business days."
            imageAlt="Promotion Banner"
            compSize="medium"
            compType="banner">
        </drv-custom-card>
    </div>
  `,
  styles: `
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

      .dTextData {
        text-align: left;
        margin-bottom: 3rem;
        h2 { 
            color: var(--drv-navy);
            font-size: 2.5rem;
            margin: 0 0 1.5rem 0.5rem;
            border-left: 15px double var(--drv-green);
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
        
        p {
            font-size: 1.2rem;
            margin:0 2rem 1rem;
            color: var(--drv-text);
            line-height: 1.75rem;
            
            
        }
        p:not(:last-child ){ text-indent: 14px }
      }

      .prdctGrid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 20px;
        margin: 0 0 3rem;
        text-align: left;
      }

      .whyUsData {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.25rem;
        margin: 0 0 2.5rem;
        text-align: left;
      }
      .svc-card {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 2rem 2.25rem;
        border-radius: 14px;
        background: linear-gradient(135deg, #ffffff 0%, var(--drv-mint-mist) 100%);
        border-left: 5px solid var(--drv-green);
        box-shadow: 0 4px 14px rgba(26, 35, 50, 0.08);
        h3 {
          margin: 0 0 0.6rem;
          color: var(--drv-navy);
          font-size: 1.6rem;
          font-weight: 700;
          line-height: 1.25;
        }
        .svc-sub {
          margin: 0 0 1rem;
          color: var(--drv-muted);
          font-size: 1rem;
          font-style: italic;
          line-height: 1.5;
        }
        .svc-body {
          margin: 0 0 1.25rem;
          color: var(--drv-text);
          font-size: 1.05rem;
          line-height: 1.7;
          white-space: pre-line;   /* keep the paragraph breaks from the content */
          text-indent: 0;
        }
        .svc-link {
          margin-top: auto;
          align-self: flex-start;
          color: var(--drv-green-deep);
          font-weight: 600;
          text-decoration: none;
          span { display: inline-block; transition: transform 0.2s; }
          &:hover span { transform: translateX(4px); }
        }
      }
      .svc-card--dark {
        background: linear-gradient(135deg, var(--drv-midnight) 0%, var(--drv-navy) 100%);
        border-left-color: var(--drv-green);
        h3 { color: #ffffff; font-size: 1.35rem; }
        .svc-sub { color: var(--drv-mint); font-style: normal; }
        .svc-body { color: rgba(255, 255, 255, 0.82); font-size: 1rem; }
        .svc-link { color: var(--drv-green); }
      }
      @media (max-width: 900px) {
        .whyUsData { grid-template-columns: 1fr; }
        .svc-card { padding: 1.5rem; }
        .svc-card h3 { font-size: 1.35rem; }
      }
  `,
})
export class Protection {
  /** Promotional banners stay hidden until there is a real, dated offer. */
  showPromo = false;

  constructor(private uis: GuiDataService) {}

  /** "Why us" panel links, in card order. */
  readonly links = [
    { label: 'See camera plans & pricing', route: '/plans', fragment: undefined as string | undefined },
    { label: 'Book a free assessment', route: '/plans', fragment: 'assessment-terms' },
  ];

  /** Article records for the "why us" panels. */
  get articles(): CardItemInterface[] {
    return this.protectedPrdcts$.filter(a => a.compType?.toString() === 'article');
  }

  /** CCTV page content, read live from the data service. */
  get protectedPrdcts$(): CardItemInterface[] {
    return this.uis.allProtectedPrdctsData$();
  }
}
