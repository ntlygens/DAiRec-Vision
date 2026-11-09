import { Component, computed } from '@angular/core';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';
import { ACCESS_FALLBACK_DATA, ACCESS_SHOWCASE } from './access.data';

@Component({
  selector: 'drv-access-control',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Smarter Access, Total Control.</h2>
        <p>
            Keys get copied, lost and never returned. DaiRec Vision replaces them with keycards, mobile
            credentials, PINs and biometric readers, all managed from one simple dashboard.
        </p>
        <p>
            From a single front door to gates, elevators and multi-site campuses, we design, install and maintain
            access systems that grow with your property.
        </p>
    </div>
    <section class="whyUsData" aria-label="Why DaiRec Vision access control">
      @for (art of articles(); track art._id; let idx = $index) {
        @if (idx < 2) {
          <article class="svc-card" [class.svc-card--dark]="idx === 1">
            <h3>{{ art.title }}</h3>
            @if (art.subtitle) {
              <p class="svc-sub">{{ art.subtitle }}</p>
            }
            @if (art.content) {
              <p class="svc-body">{{ art.content }}</p>
            }
            <a class="svc-link" [routerLink]="links[idx].route">
              {{ links[idx].label }} <span aria-hidden="true">→</span>
            </a>
          </article>
        }
      }
    </section>
    <div class="accsSrvcs">
      @for (item of accessData(); track item._id) {
        @if (item.compType?.toString() === 'product') {
          <drv-custom-card
            class="accsSrvcs-card"
            [id]="item._id"
            [clickable]="true"
            [elevated]="true"
            [compSize]="item.compSize?.toString()"
            [compType]="item.compType?.toString()"
            [cardData]="item">
          </drv-custom-card>
        }
      }
    </div>
    <div class="srvcDataDsply">
      <drv-jumbotron-component [data]="showcase" />
    </div>
    <div class="dTextData">
      <h1 style="border-left: 0; padding-left: 0; text-align: center;">Your Doors, Under Control.</h1>
      <h2>Schedule Your Free Access Assessment.</h2>
        <p>
            We walk every entry point, check your doors, wiring and network, and send a written access plan
            and quote within 3–5 business days.
        </p>
    </div>
    <a class="cta-link" routerLink="/protect">
      <span class="cta-icon"><mat-icon>videocam</mat-icon></span>
      <span class="cta-text">
        <strong>Add Video-Verified Entry</strong>
        <span>Pair access control with DaiRec cameras so every badge swipe, forced door and propped door comes with video.</span>
      </span>
      <span class="cta-go">Explore <mat-icon>arrow_forward</mat-icon></span>
    </a>
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
        h1 { 
            color: var(--drv-navy);
            font-size: 4.5rem;
            margin: 4rem 0 1.5rem 0.5rem;
            border-left: 15px double var(--drv-green);
            padding-left: 0.5rem;
            line-height: initial;
            
        }
        
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
        p:not(:last-child ){ text-indent: 14px };
      }
      

      .accsSrvcs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          text-align: left;
      }

      .cta-link {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.5rem 1.75rem;
        margin: 0 0 2rem;
        text-align: left;
        text-decoration: none;
        color: #fff;
        background: linear-gradient(135deg, var(--drv-midnight), var(--drv-navy));
        border-radius: 14px;
        border-left: 6px solid var(--drv-green);
        box-shadow: 0 8px 24px rgba(26, 35, 50, 0.25);
        transition: transform 0.2s, box-shadow 0.2s;
        .cta-icon {
          flex: none;
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(46, 204, 113, 0.15);
          mat-icon { color: var(--drv-green); font-size: 30px; width: 30px; height: 30px; }
        }
        .cta-text {
          flex: 1;
          display: flex; flex-direction: column; gap: 0.3rem;
          strong { font-size: 1.4rem; }
          span { color: rgba(255, 255, 255, 0.75); line-height: 1.5; }
        }
        .cta-go {
          flex: none;
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.65rem 1.2rem;
          border-radius: 999px;
          background: var(--drv-green);
          color: var(--drv-on-green);
          font-weight: 600;
          mat-icon { font-size: 20px; width: 20px; height: 20px; transition: transform 0.2s; }
        }
        &:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(26, 35, 50, 0.35); }
        &:hover .cta-go mat-icon { transform: translateX(3px); }
      }
      @media (max-width: 700px) {
        .cta-link { flex-direction: column; align-items: flex-start; }
      }

      .srvcDataDsply {
          display: unset;
      }
  `,
})
export class AccessControl {
  constructor(private uis: GuiDataService) {}

  /** Database content when it is complete, otherwise the bundled page content. */
  protected readonly accessData = computed<CardItemInterface[]>(() => {
    const fromDb = this.uis.allAccessPrdctsData$();
    const usable = fromDb?.length && fromDb.every(r => r.title && !/title here|lorem/i.test(r.title));
    return usable ? fromDb : ACCESS_FALLBACK_DATA;
  });

  /** Article records for the "why us" panels. */
  protected readonly articles = computed(() =>
    this.accessData().filter(a => a.compType?.toString() === 'article'));

  /** Full-width banner panel below the credential cards. */
  readonly showcase = ACCESS_SHOWCASE;

  /** "Why us" panel links, in card order. */
  readonly links = [
    { label: 'See plans & pricing', route: '/plans' },
    { label: 'Explore CCTV & cameras', route: '/protect' },
  ];
}
