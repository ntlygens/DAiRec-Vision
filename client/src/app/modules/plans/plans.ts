import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ASSESSMENT_TERMS, CONTACT_EMAIL, PLAN_ADDONS, PLAN_FAQS, PLAN_TIERS, PlanAudience, PlanTier, REFERRAL_CREDIT,
} from './plans.data';

@Component({
  selector: 'drv-plans',
  standalone: false,
  template: `
    <div class="dTextData">
      <h2>Professional Security on a Simple Monthly Plan.</h2>
      <p>
        Every plan includes professional installation, our monitoring app, and local support.
        Choose the plan that fits your property, or let us design a custom package for you.
      </p>
    </div>

    <mat-button-toggle-group
      class="audience-toggle"
      aria-label="Plan type"
      [value]="audience()"
      (change)="setAudience($event.value)">
      <mat-button-toggle value="private">Homes &amp; Private Clients</mat-button-toggle>
      <mat-button-toggle value="enterprise">Business &amp; Enterprise</mat-button-toggle>
    </mat-button-toggle-group>

    <div class="plan-grid">
      @for (plan of visiblePlans(); track plan.id) {
        <mat-card class="plan-card" [class.featured]="!!plan.badge" [class.pulse]="highlighted() === plan.id">
          @if (plan.badge) {
            <span class="plan-badge">{{ plan.badge }}</span>
          }
          <h3>{{ plan.name }}</h3>
          <p class="plan-for">{{ plan.forWho }}</p>
          <div class="plan-price">{{ plan.price }}<small>{{ plan.per }}</small></div>
          <p class="plan-install">{{ plan.install }}</p>
          <ul>
            @for (f of plan.features; track f) {
              <li><mat-icon>check_circle</mat-icon>{{ f }}</li>
            }
          </ul>
          @if (plan.nudge) {
            <button type="button" class="plan-nudge" (click)="setAudience('private'); highlight('home-pro')">{{ plan.nudge }}</button>
          }
          @if (plan.badge) {
            <a mat-flat-button [href]="mailtoFor(plan)">{{ plan.cta }}</a>
          } @else {
            <a mat-stroked-button [href]="mailtoFor(plan)">{{ plan.cta }}</a>
          }
        </mat-card>
      }
    </div>
    <p class="plan-note">
      Prices shown are starting prices. Final pricing depends on property size, equipment, and site survey.
      Starter installation (3 cameras): $349 wireless / $499 wired with a 24-month Home Pro plan,
      or $599 / $1,149 month-to-month.
      All equipment is leased, maintained and updated by DaiRec Vision as part of your plan.
      Installation financing available with a plan (excludes drone programs). Prices exclude applicable sales tax.
    </p>
    <p class="referral-note">
      <mat-icon>favorite_border</mat-icon>
      Know someone who could use better security? Refer them and you'll each get {{ referralCredit }} off.
      <a [href]="referralMailto">Share a referral</a>
    </p>

    <div class="dTextData">
      <h1>Add-Ons</h1>
    </div>
    <table class="addon-table">
      <thead>
        <tr><th>Add-on</th><th>What you get</th><th>Price</th></tr>
      </thead>
      <tbody>
        @for (a of addOns; track a.name) {
          <tr><td><strong>{{ a.name }}</strong></td><td>{{ a.detail }}</td><td>{{ a.price }}</td></tr>
        }
      </tbody>
    </table>

    <div class="dTextData">
      <h1>Common Questions</h1>
    </div>
    <mat-accordion class="faq">
      @for (item of faqs; track item.q) {
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>{{ item.q }}</mat-panel-title>
          </mat-expansion-panel-header>
          <p>{{ item.a }}</p>
        </mat-expansion-panel>
      }
    </mat-accordion>

    <section id="assessment-terms" class="terms" aria-labelledby="termsTitle">
      <h2 id="termsTitle"><mat-icon>assignment_turned_in</mat-icon> Free Security Assessment: Terms</h2>
      <dl>
        @for (t of assessmentTerms; track t.label) {
          <div class="term"><dt>{{ t.label }}</dt><dd>{{ t.text }}</dd></div>
        }
      </dl>
    </section>

    <div class="dTextData">
      <h1 style="border-left: 0; padding-left: 0; text-align: center;">Not Sure Which Plan Fits?</h1>
      <p style="text-align: center;">Get a free security assessment and a custom quote within 24 hours.</p>
    </div>
    <div class="cta-row">
      <a mat-flat-button [href]="assessmentMailto"><mat-icon>assignment</mat-icon> Get My Free Assessment</a>
      <button mat-stroked-button (click)="router.navigate(['/drone'])"><mat-icon>flight</mat-icon> Explore Drone Surveillance</button>
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
        margin: 4rem 0 1.5rem 0.5rem;
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
      p {
        font-size: 1.2rem;
        margin: 0 2rem 1rem;
        color: #1c1818;
        line-height: 1.75rem;
      }
    }

    .audience-toggle {
      align-self: center;
      margin-bottom: 2.5rem;
    }

    .plan-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      align-items: stretch;
      text-align: left;
    }
    .plan-card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 2.25rem 2rem 2rem;
      border: 2px solid transparent;
      border-radius: 12px;
      overflow: visible;
      &.featured { border-color: #2ecc71; }
      h3 { color: #2c3e50; font-size: 1.5rem; margin: 0 0 0.25rem; }
      .plan-for { color: #777; margin: 0 0 1.25rem; }
      .plan-price {
        color: #2c3e50; font-size: 2.6rem; font-weight: 700; line-height: 1.1; margin: 0;
        small { font-size: 1rem; font-weight: 500; color: #777; }
      }
      .plan-install { color: #777; font-size: 0.9rem; margin: 0.35rem 0 1.25rem; }
      ul { list-style: none; padding: 0; margin: 0 0 1.75rem; flex: 1; }
      li {
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.45rem 0; color: #555; border-bottom: 1px solid #f0f0f0;
        mat-icon { color: #2ecc71; font-size: 20px; width: 20px; height: 20px; flex: none; }
      }
      a { width: 100%; }
    }
    .plan-nudge {
      margin: -1rem 0 1.25rem; padding: 0; border: none; background: none; cursor: pointer;
      text-align: left; font: inherit; font-size: 0.85rem; font-style: italic; color: #8a94a3;
    }
    .plan-nudge:hover { color: #2c3e50; text-decoration: underline; }
    .plan-card.pulse { animation: planPulse 1.6s ease-out; }
    @keyframes planPulse { 0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, .55); } 100% { box-shadow: 0 0 0 18px rgba(46, 204, 113, 0); } }
    .plan-badge {
      position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
      background: #2ecc71; color: #fff; font-size: 0.8rem; font-weight: 700;
      padding: 0.3rem 0.9rem; border-radius: 999px; text-transform: uppercase;
      letter-spacing: 0.03em; white-space: nowrap;
    }
    .plan-note { color: #777; font-size: 0.95rem; margin-top: 2rem; }
    .referral-note {
      display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 0.4rem;
      margin: -0.5rem 0 1rem; color: #8a94a3; font-size: 0.88rem;
      mat-icon { font-size: 16px; width: 16px; height: 16px; color: #2ecc71; }
      a { color: #2c3e50; text-decoration: underline; text-underline-offset: 2px; }
      a:hover { color: #2ecc71; }
    }

    .addon-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      th, td { padding: 1rem 1.25rem; border-bottom: 1px solid #eee; }
      th { background: #2c3e50; color: #fff; font-weight: 600; }
      td:last-child, th:last-child { text-align: right; white-space: nowrap; }
    }

    .faq { text-align: left; p { color: #555; } }

    .terms {
      scroll-margin-top: 90px;   /* clear the sticky header when linked to */
      margin: 2.5rem 0 1rem;
      padding: 1.75rem 2rem;
      text-align: left;
      background: #f8f9fa;
      border-left: 4px solid #2ecc71;
      border-radius: 10px;
      h2 { display: flex; align-items: center; gap: 0.5rem; margin: 0 0 1rem; color: #2c3e50; font-size: 1.35rem; }
      h2 mat-icon { color: #2ecc71; }
      dl { margin: 0; display: grid; gap: 0.6rem; }
      .term { display: grid; grid-template-columns: 170px 1fr; gap: 1rem; margin: 0; }
      dt { font-weight: 600; color: #2c3e50; }
      dd { margin: 0; color: #555; line-height: 1.5; }
    }
    @media (max-width: 600px) {
      .terms { padding: 1.25rem; }
      .terms .term { grid-template-columns: 1fr; gap: 0.15rem; }
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
      .addon-table th, .addon-table td { padding: 0.75rem; font-size: 0.92rem; }
    }
  `,
})
export class Plans implements OnInit {
  protected readonly audience = signal<PlanAudience>('private');
  protected readonly highlighted = signal<string | null>(null);
  protected readonly visiblePlans = computed(() =>
    PLAN_TIERS.filter(p => p.audience === this.audience()),
  );
  protected readonly addOns = PLAN_ADDONS;
  protected readonly faqs = PLAN_FAQS;
  protected readonly assessmentTerms = ASSESSMENT_TERMS;
  protected readonly referralCredit = REFERRAL_CREDIT;
  protected readonly referralMailto =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Referral')}&body=${encodeURIComponent("Hi DaiRec Vision team,\n\nI'd like to refer:\nName:\nPhone or email:\n\nReferred by (your name):\n")}`;
  protected readonly assessmentMailto =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Free security assessment request')}`;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Supports deep links like /plans?for=enterprise (used by the Drone page).
    const forParam = this.route.snapshot.queryParamMap.get('for');
    if (forParam === 'private' || forParam === 'enterprise') {
      this.audience.set(forParam);
    }
  }

  setAudience(value: PlanAudience) {
    this.audience.set(value);
  }

  /** Briefly draw attention to a plan card (used by the Essentials upsell line). */
  highlight(id: string) {
    this.highlighted.set(id);
    setTimeout(() => this.highlighted.set(null), 1600);
  }

  mailtoFor(plan: PlanTier): string {
    const subject = encodeURIComponent(`Plan inquiry: ${plan.name}`);
    const body = encodeURIComponent(`Hi DaiRec Vision team,\n\nI'm interested in the ${plan.name} plan.\n\nProperty type:\nLocation:\nBest way to reach me:\n`);
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }
}
