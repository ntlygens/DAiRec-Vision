import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LEGAL_UPDATED, PRIVACY_POLICY, TERMS_OF_SERVICE, LegalDoc } from './legal.data';

/** Privacy Policy and Terms of Service; the route's data.doc picks which. */
@Component({
  selector: 'drv-legal-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="legal">
      <header>
        <p class="legal-eyebrow">Legal</p>
        <h1>{{ doc().title }}</h1>
        <p class="legal-updated">Last updated {{ updated }}</p>
        <p class="legal-intro">{{ doc().intro }}</p>
      </header>

      <nav class="legal-toc" aria-label="On this page">
        @for (s of doc().sections; track s.heading; let i = $index) {
          <a [routerLink]="[]" [fragment]="'s' + (i + 1)">{{ s.heading }}</a>
        }
      </nav>

      @for (s of doc().sections; track s.heading; let i = $index) {
        <section [id]="'s' + (i + 1)">
          <h2>{{ s.heading }}</h2>
          @for (p of s.paragraphs ?? []; track $index) {
            @if ($index === 0 && s.list) {
              <ul>@for (li of s.list; track $index) { <li>{{ li }}</li> }</ul>
            }
            <p>{{ p }}</p>
          }
          @if (s.list && !s.paragraphs?.length) {
            <ul>@for (li of s.list; track $index) { <li>{{ li }}</li> }</ul>
          }
        </section>
      }

      <p class="legal-switch">
        @if (isPrivacy()) {
          See also our <a routerLink="/terms">Terms of Service</a>.
        } @else {
          See also our <a routerLink="/privacy">Privacy Policy</a>.
        }
      </p>
    </article>
  `,
  styles: `
    :host { display: block; width: 100%; margin: 2rem 0 90px; }
    .legal { max-width: 820px; margin: 0 auto; text-align: left; color: var(--drv-text); }
    .legal-eyebrow { margin: 0 0 0.4rem; color: var(--drv-green-deep); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h1 { margin: 0 0 0.4rem; color: var(--drv-navy); font-size: 2.6rem; line-height: 1.2; border-left: 15px double var(--drv-green); padding-left: 0.6rem; }
    .legal-updated { margin: 0 0 1.5rem; color: var(--drv-muted); font-size: 0.95rem; }
    .legal-intro { font-size: 1.12rem; line-height: 1.75; margin: 0 0 2rem; }
    .legal-toc {
      display: flex; flex-wrap: wrap; gap: 0.5rem;
      padding: 1rem 1.25rem; margin: 0 0 2.5rem;
      background: var(--drv-mint-mist); border: 1px solid var(--drv-line); border-radius: 12px;
      a {
        padding: 0.3rem 0.7rem; border-radius: 999px; background: var(--drv-white);
        border: 1px solid var(--drv-line); color: var(--drv-navy); font-size: 0.88rem; text-decoration: none;
      }
      a:hover { border-color: var(--drv-green); color: var(--drv-green-deep); }
    }
    section { margin: 0 0 2rem; scroll-margin-top: 90px; }
    h2 { margin: 0 0 0.75rem; color: var(--drv-navy); font-size: 1.4rem; }
    p, li { font-size: 1.02rem; line-height: 1.75; }
    p { margin: 0 0 0.9rem; }
    ul { margin: 0 0 1rem; padding-left: 1.25rem; }
    li { margin: 0 0 0.5rem; }
    li::marker { color: var(--drv-green); }
    a { color: var(--drv-green-deep); }
    .legal-switch { margin-top: 3rem; padding-top: 1.25rem; border-top: 1px solid var(--drv-line); color: var(--drv-muted); }
    @media (max-width: 700px) { h1 { font-size: 2rem; } }
  `,
})
export class LegalPage {
  private readonly data = toSignal(inject(ActivatedRoute).data);
  protected readonly isPrivacy = computed(() => this.data()?.['doc'] === 'privacy');
  protected readonly doc = computed<LegalDoc>(() => (this.isPrivacy() ? PRIVACY_POLICY : TERMS_OF_SERVICE));
  protected readonly updated = LEGAL_UPDATED;
}
