import { Component } from '@angular/core';
import { ASSESSMENT_HREF } from '../../core-comps/nav-links';

@Component({
  selector: 'drv-remote-monitoring',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Never Be In The Dark. Always Be In Control.</h2>
      <p>
        The world doesn't stop when you leave, and neither should your security. DaiRec Vision remote monitoring
        puts every camera, alert and recording in the palm of your hand, with trained professionals ready to watch
        and respond when you can't.
      </p>
    </div>

    <div class="feature-grid">
      @for (f of features; track f.title) {
        <div class="feature">
          <mat-icon>{{ f.icon }}</mat-icon>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </div>
      }
    </div>

    <div class="dTextData">
      <h1>Choose Your Level of Monitoring</h1>
    </div>
    <div class="levels">
      @for (l of levels; track l.title) {
        <div class="level" [class.featured]="l.featured">
          <span class="level-tag">{{ l.tag }}</span>
          <h3>{{ l.title }}</h3>
          <p>{{ l.text }}</p>
          <ul>
            @for (pt of l.points; track pt) {
              <li><mat-icon>check_circle</mat-icon>{{ pt }}</li>
            }
          </ul>
        </div>
      }
    </div>

    <div class="cta-row">
      <a mat-flat-button routerLink="/plans"><mat-icon>sell</mat-icon> See Monitoring Plans</a>
      <a mat-stroked-button [href]="assessmentHref"><mat-icon>assignment</mat-icon> Get a Free Assessment</a>
      <a mat-button routerLink="/surveil"><mat-icon>arrow_back</mat-icon> Back to Video Surveillance</a>
    </div>
  `,
  styles: `
    :host {
      width: 100%;
      margin: 0 0 90px;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    div { margin: 0 0 20px; }

    .dTextData {
      text-align: left;
      margin-bottom: 2rem;
      h1 {
        color: #2c3e50;
        font-size: 4.5rem;
        margin: 3rem 0 1.5rem 0.5rem;
        border-left: 15px double #2ecc71;
        padding-left: 0.5rem;
        line-height: initial;
      }
      h2 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin: 0 0 1.5rem 0.5rem;
        border-left: 15px double #2ecc71;
        padding-left: 0.5rem;
        line-height: initial;
      }
      p { font-size: 1.2rem; margin: 0 2rem 1rem; color: #1c1818; line-height: 1.75rem; }
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 1.5rem;
      text-align: left;
    }
    .feature {
      margin: 0;
      padding: 1.75rem 1.5rem;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      border-top: 4px solid #2ecc71;
      transition: transform 0.2s;
      &:hover { transform: translateY(-4px); }
      mat-icon { color: #2ecc71; font-size: 34px; width: 34px; height: 34px; }
      h3 { color: #2c3e50; margin: 0.75rem 0 0.4rem; }
      p { color: #555; margin: 0; line-height: 1.5rem; }
    }

    .levels {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      text-align: left;
    }
    .level {
      margin: 0;
      padding: 2rem;
      border-radius: 14px;
      background: #f8f9fa;
      border: 2px solid transparent;
      &.featured { background: #fff; border-color: #2ecc71; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); }
      h3 { color: #2c3e50; font-size: 1.5rem; margin: 0.6rem 0 0.4rem; }
      p { color: #555; line-height: 1.5rem; }
      ul { list-style: none; padding: 0; margin: 1rem 0 0; }
      li {
        display: flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0; color: #555;
        mat-icon { color: #2ecc71; font-size: 20px; width: 20px; height: 20px; flex: none; }
      }
    }
    .level-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      background: #2c3e50;
      color: #fff;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .featured .level-tag { background: #2ecc71; }

    .cta-row { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 2rem; }

    @media (max-width: 768px) {
      .dTextData h1 { font-size: 2.5rem; }
      .dTextData h2 { font-size: 1.8rem; }
    }
  `,
})
export class RemoteMonitoring {
  protected readonly assessmentHref = ASSESSMENT_HREF;

  protected readonly features = [
    { icon: 'live_tv', title: 'Live Streaming Access', text: 'View multiple camera feeds at once from your phone, tablet or computer, at home or across the globe.' },
    { icon: 'cloud_done', title: 'Cloud Video Storage', text: 'Recordings back up automatically with encrypted protection and instant retrieval when you need evidence.' },
    { icon: 'notifications_active', title: 'Proactive Alerts', text: 'Instant notifications for motion, perimeter breaches or suspicious activity, with custom zones and schedules.' },
    { icon: 'support_agent', title: 'Professional Monitoring', text: 'Trained security professionals watch your property 24/7 and dispatch emergency services when threats are verified.' },
  ];

  protected readonly levels = [
    {
      tag: 'Self-monitored', title: 'You Stay in Control', featured: false,
      text: 'Watch live, review footage and get smart alerts yourself through the DaiRec Vision app.',
      points: ['Live view & playback on any device', 'AI alerts for people, vehicles & packages', 'Encrypted cloud recording'],
    },
    {
      tag: '24/7 Professional', title: "We Watch So You Don't Have To", featured: true,
      text: 'Our monitoring team verifies every alarm and dispatches responders, day and night.',
      points: ['Everything in self-monitored', 'Verified alarms, fewer false dispatches', 'Police, fire & medical dispatch', 'Incident reports with footage'],
    },
  ];
}
