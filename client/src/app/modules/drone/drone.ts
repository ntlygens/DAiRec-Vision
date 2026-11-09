import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CardItemInterface } from '../../models/ui-x';
import { GuiDataService } from '../../services/gui-data-service';
import { DRONE_FALLBACK_DATA } from './drone.data';

@Component({
  selector: 'drv-drone',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Eyes in the Sky. On Patrol Before You Ask.</h2>
      <p>
        Fixed cameras see what is in front of them. A drone goes where the threat is.
        DaiRec Vision Security deploys autonomous, dock-based drone systems that patrol large properties
        on a schedule, launch the moment an alarm trips, and put live aerial video in front of your team
        within seconds, with no pilot needed on site.
      </p>
    </div>

    <div class="dTextData">
      <h1>How Automated Patrols Work</h1>
    </div>
    <div class="steps">
      @for (step of steps; track step.title; let idx = $index) {
        <div class="step">
          <span class="step-num">{{ idx + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      }
    </div>

    <div class="srvlSrvcs">
      @for (srvc of droneData(); track srvc._id) {
        @if (srvc.compType?.toString() === 'product') {
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
      <h1>Where Drone Patrols Make Sense</h1>
    </div>
    <div class="srvlSrvcType">
      @for (srvcT of droneData(); track srvcT._id) {
        @if (srvcT.compType?.toString() === 'feature') {
          <drv-jumbotron-component
            class="srvlSrvcType-tron"
            [data]="{
              title: srvcT.title,
              subtitle: srvcT.subtitle,
              description: srvcT.desc,
              content: srvcT.content,
              img: srvcT.img,
              imageAlt: srvcT.name,
              imagePosition: 'right',
              compSize: 'small',
              compType: srvcT.compType,
              backgroundColor: srvcT.backgroundColor,
              overlay: false,
            }">
          </drv-jumbotron-component>
        }
      }
    </div>

    <div class="compliance">
      <h2>Flown Responsibly, Within the Rules</h2>
      <p>Aerial surveillance carries real legal and privacy responsibilities. Every DaiRec Vision drone program is designed around them.</p>
      <ul>
        @for (rule of compliance; track rule.title) {
          <li><mat-icon>verified</mat-icon><span><strong>{{ rule.title }}</strong> {{ rule.text }}</span></li>
        }
      </ul>
    </div>

    <div class="dTextData">
      <h1 style="border-left: 0; padding-left: 0; text-align: center;">See Your Property From Above.</h1>
      <p style="text-align: center;">
        We assess your site, airspace and local rules, then design a patrol plan that fits, wherever drone patrols are permitted.
      </p>
    </div>
    <div class="cta-row">
      <button mat-flat-button (click)="goTo('/plans', 'enterprise')"><mat-icon>sell</mat-icon> See Drone Plans</button>
      <a mat-stroked-button href="mailto:info@dairecvision.com?subject=Drone%20site%20survey%20request"><mat-icon>flight</mat-icon> Request a Drone Site Survey</a>
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      margin: 0 0 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
    }
    div { margin: 0 0 20px; }

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
        margin: 0 2rem 1rem;
        color: var(--drv-text);
        line-height: 1.75rem;
      }
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      text-align: left;
      .step {
        position: relative;
        background: var(--drv-cloud);
        border-top: 4px solid var(--drv-green);
        border-radius: 10px;
        padding: 2rem 1.5rem 1.25rem;
        margin: 0;
        h3 { color: var(--drv-navy); margin: 0.25rem 0 0.5rem; }
        p { color: var(--drv-text); margin: 0; line-height: 1.5rem; }
      }
      .step-num {
        position: absolute;
        top: -18px; left: 1.5rem;
        width: 34px; height: 34px;
        border-radius: 50%;
        background: var(--drv-navy); color: #fff;
        display: flex; align-items: center; justify-content: center;
        font-weight: bold;
      }
    }

    .srvlSrvcs {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      .srvlSrvcs-card { flex: 1 1 220px; }
    }

    .srvlSrvcType {
      display: inline-flex;
      overflow-x: scroll;
      width: auto;
      justify-content: space-between;
      .srvlSrvcType-tron { min-width: 600px; }
      .srvlSrvcType-tron:not(:first-child) { margin-left: 20px; }
    }

    .compliance {
      text-align: left;
      border: 2px solid var(--drv-green);
      border-radius: 10px;
      padding: 2rem 2.5rem;
      background: #fff;
      h2 { color: var(--drv-navy); margin-top: 0; }
      p { color: var(--drv-text); font-size: 1.1rem; }
      ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem 2rem;
      }
      li { display: flex; gap: 0.6rem; color: var(--drv-text); line-height: 1.5rem; }
      mat-icon { color: var(--drv-green); flex: none; }
      strong { color: var(--drv-navy); }
    }

    .cta-row {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .dTextData h1 { font-size: 2.5rem; }
      .dTextData h2 { font-size: 1.8rem; }
      .srvlSrvcType .srvlSrvcType-tron { min-width: 85vw; }
      .compliance { padding: 1.5rem; }
    }
  `,
})
export class Drone {
  /** Mongo `dronePgData` when available, otherwise bundled fallback content. */
  protected readonly droneData = computed<CardItemInterface[]>(() => {
    const fromDb = this.uis.allDronePrdctsData$();
    return fromDb && fromDb.length ? fromDb : DRONE_FALLBACK_DATA;
  });

  protected readonly steps = [
    { title: 'Dock & Charge', text: 'The drone lives in a weatherproof docking station on your property that charges it, protects it, and keeps it ready to fly around the clock.' },
    { title: 'Launch on Trigger', text: 'Flights start on a patrol schedule, from a camera or access-control alarm, or on demand from your phone or our monitoring team.' },
    { title: 'Patrol & Stream', text: 'The drone flies pre-mapped routes inside a geofence and streams HD and thermal video live to your dashboard and our operators.' },
    { title: 'Verify & Respond', text: 'Operators verify the event, alert your team or dispatch responders, and every flight is logged with footage for your records.' },
  ];

  protected readonly compliance = [
    { title: 'Where the law allows.', text: 'Drone patrols operate wherever federal, state and local rules permit them. Many suburban, industrial and private sites qualify; some areas, including much of New York City, currently restrict drone takeoff and landing. Your site survey confirms exactly what is permitted at your property before any drone flies.' },
    { title: 'FAA-compliant operations.', text: 'Flights are managed by FAA Part 107 certified remote pilots, with Remote ID and any required waivers or airspace authorizations in place before launch.' },
    { title: 'Your property only.', text: 'Geofences keep patrols over areas you own or control, and we respect local airspace and no-fly restrictions.' },
    { title: 'Privacy by design.', text: 'Routes and camera angles are planned to avoid neighboring homes and private spaces, in line with state and local privacy laws.' },
    { title: 'Secure footage handling.', text: 'Encrypted storage, role-based access, and retention periods you set, so footage is kept only as long as you need it.' },
  ];

  constructor(
    private router: Router,
    private uis: GuiDataService,
  ) {}

  goTo(route: string, audience?: string) {
    this.router.navigate([route], audience ? { queryParams: { for: audience } } : undefined);
  }
}
