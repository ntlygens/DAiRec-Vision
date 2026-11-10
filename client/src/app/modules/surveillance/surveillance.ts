import { Component } from '@angular/core';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';

@Component({
  selector: 'drv-surveillance',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Real-Time Protection, Real Results.</h2>
        <p>
            Business continues, families move through their day, and valuable assets stay in place while you're
            away. Your security shouldn't pause either.
        </p>
        <p>
            DaiRec Vision delivers 24/7 video surveillance with intelligent motion detection and instant alerts.
            View live feeds, review footage and respond to incidents from your phone, wherever you are.
        </p>
    </div>
    <section class="whyUsData" aria-label="Why DaiRec Vision surveillance">
      @for (srvl of articles; track srvl._id; let idx = $index) {
        @if (idx < 2) {
          <article class="svc-card" [class.svc-card--dark]="idx === 1">
            <h3>{{ srvl.title }}</h3>
            @if (srvl.subtitle) {
              <p class="svc-sub">{{ srvl.subtitle }}</p>
            }
            @if (srvl.content) {
              <p class="svc-body">{{ srvl.content }}</p>
            }
            <a class="svc-link" [routerLink]="links[idx].route">
              {{ links[idx].label }} <span aria-hidden="true">→</span>
            </a>
          </article>
        }
      }
    </section>
    <div class="srvlSrvcs">
      @for(srvc of srvlPrdcts$; track srvc._id; let idx = $index; let e = $even) {
        @if (srvc.compType?.toString() === "product") {
            <drv-custom-card 
              class="srvlSrvcs-card"
              [id]="srvc._id"
              [clickable]="true"
              [elevated]="true"
              [compSize]="srvc.compSize?.toString()"
              [compType]="srvc.compType?.toString()"
              [cardData]="srvc">
            </drv-custom-card>
        }
      }
    </div>
    <div class="dTextData">
      <h1>For Every Property Type</h1>
    </div>
    <div class="srvlSrvcType">
      @for (srvcT of srvlPrdcts$; track srvcT._id) {
        @if (srvcT.compType?.toString() === 'feature') {
          <drv-property-type [data]="srvcT" />
        }
      }
    </div>
    <div class="dTextData">
      <h1 style="border-left: 0; padding-left: 0; text-align: center;">Experience True Peace of Mind.</h1>
      <h2>Schedule Your Free Monitoring Consultation.</h2>
        <p>
            Tell us about your property and we'll recommend the right mix of cameras, smart alerts and
            professional monitoring, starting with a free on-site assessment and a written quote within
            3–5 business days.
        </p>
    </div>
    <a class="monitor-cta" routerLink="/monitor">
      <span class="monitor-icon"><mat-icon>live_tv</mat-icon></span>
      <span class="monitor-text">
        <strong>Remote Monitoring</strong>
        <span>Live feeds on any device, encrypted cloud video, instant alerts and optional 24/7 professional monitoring.</span>
      </span>
      <span class="monitor-go">Explore <mat-icon>arrow_forward</mat-icon></span>
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
      

      .srvlSrvcs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          text-align: left;
      }

      .monitor-cta {
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
        .monitor-icon {
          flex: none;
          display: flex; align-items: center; justify-content: center;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(46, 204, 113, 0.15);
          mat-icon { color: var(--drv-green); font-size: 30px; width: 30px; height: 30px; }
        }
        .monitor-text {
          flex: 1;
          display: flex; flex-direction: column; gap: 0.3rem;
          strong { font-size: 1.4rem; }
          span { color: rgba(255, 255, 255, 0.75); line-height: 1.5; }
        }
        .monitor-go {
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
        &:hover .monitor-go mat-icon { transform: translateX(3px); }
      }
      @media (max-width: 700px) {
        .monitor-cta { flex-direction: column; align-items: flex-start; }
      }

      .srvlSrvcType {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        margin: 0 0 3rem;
      }
  `,
})
export class Surveillance {
  constructor(private uis: GuiDataService) {}

  /** "Why us" panel links, in card order. */
  readonly links = [
    { label: 'See plans & pricing', route: '/plans' },
    { label: 'Explore remote monitoring', route: '/monitor' },
  ];

  /** Article records for the "why us" panels. */
  get articles(): CardItemInterface[] {
    return this.srvlPrdcts$.filter(a => a.compType?.toString() === 'article');
  }

  /** Surveillance page content, read live from the data service. */
  get srvlPrdcts$(): CardItemInterface[] {
    return this.uis.allSurveilPrdctsData$();
  }
}
