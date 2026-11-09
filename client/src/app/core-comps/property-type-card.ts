import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CardItemInterface } from '../models/ui-x';

/** Title keyword -> photo, icon and crop, used when a record has no usable image. */
const PROPERTY_LOOKS: { re: RegExp; img: string; icon: string; pos?: string }[] = [
  { re: /home|famil/i,                       img: '/assets/backgrounds/landing-Bnr.webp', icon: 'home',       pos: '20% 60%' },
  { re: /estate/i,                           img: '/assets/backgrounds/landing-Bnr.webp', icon: 'cottage',    pos: '15% 60%' },
  { re: /business|retail|store|office/i,     img: '/assets/backgrounds/access-Bnr.webp',  icon: 'storefront', pos: '35% 50%' },
  { re: /construction/i,                     img: '/assets/backgrounds/install-Bnr.webp', icon: 'construction' },
  { re: /energy|utilit|solar/i,              img: '/assets/backgrounds/surveil-Bnr.webp', icon: 'bolt',       pos: '50% 30%' },
  { re: /multi.site|industrial|logistic|warehouse/i, img: '/assets/backgrounds/surveil-Bnr.webp', icon: 'factory' },
];

/** Placeholder stock photos and banners with baked-in text are never used on these cards. */
const UNUSABLE_IMG = /collage-image|home-Bnr/i;

/**
 * "Property type" card: photo with a HUD frame and title, a short pitch, one supporting
 * point and an assessment link. Used on the Surveillance and Drone pages.
 */
@Component({
  selector: 'drv-property-type',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  template: `
    <article class="pt">
      <div class="pt-media">
        <img [src]="look().img" [alt]="''" [style.object-position]="look().pos" loading="lazy" />
        <span class="pt-frame" aria-hidden="true"></span>
        <span class="pt-chip"><span class="pt-dot"></span>{{ chip() }}</span>
        <div class="pt-head">
          <span class="pt-icon" aria-hidden="true"><mat-icon>{{ look().icon }}</mat-icon></span>
          <h3>{{ data().title }}</h3>
        </div>
      </div>
      <div class="pt-body">
        @if (data().subtitle) { <p class="pt-eyebrow">{{ data().subtitle }}</p> }
        @if (data().desc) { <p class="pt-desc">{{ data().desc }}</p> }
        @if (data().content) {
          <p class="pt-point"><mat-icon aria-hidden="true">check_circle</mat-icon><span>{{ data().content }}</span></p>
        }
        <a class="pt-link" routerLink="/plans" fragment="assessment-terms">
          Book a free assessment <mat-icon aria-hidden="true">arrow_forward</mat-icon>
        </a>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .pt {
      height: 100%;
      display: flex; flex-direction: column;
      text-align: left;
      background: var(--drv-white);
      border: 1px solid var(--drv-line);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(26, 35, 50, 0.06);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .pt:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(26, 35, 50, 0.14); }

    .pt-media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: var(--drv-midnight); }
    .pt-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
    .pt:hover .pt-media img { transform: scale(1.05); }
    .pt-media::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(26, 35, 50, 0.15) 0%, rgba(26, 35, 50, 0.05) 40%, rgba(26, 35, 50, 0.88) 100%);
    }

    /* camera-viewfinder corners */
    .pt-frame {
      position: absolute; inset: 12px; z-index: 1; pointer-events: none;
      --c: rgba(159, 255, 201, 0.85);
      background:
        linear-gradient(var(--c), var(--c)) top left / 18px 2px no-repeat,
        linear-gradient(var(--c), var(--c)) top left / 2px 18px no-repeat,
        linear-gradient(var(--c), var(--c)) top right / 18px 2px no-repeat,
        linear-gradient(var(--c), var(--c)) top right / 2px 18px no-repeat,
        linear-gradient(var(--c), var(--c)) bottom left / 18px 2px no-repeat,
        linear-gradient(var(--c), var(--c)) bottom left / 2px 18px no-repeat,
        linear-gradient(var(--c), var(--c)) bottom right / 18px 2px no-repeat,
        linear-gradient(var(--c), var(--c)) bottom right / 2px 18px no-repeat;
    }
    .pt-chip {
      position: absolute; top: 20px; right: 22px; z-index: 2;
      display: inline-flex; align-items: center; gap: 6px;
      padding: 3px 9px; border-radius: 999px;
      background: rgba(26, 35, 50, 0.72);
      color: var(--drv-mint);
      font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
    }
    .pt-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--drv-alert); animation: pt-blink 1.6s ease-in-out infinite; }
    @keyframes pt-blink { 50% { opacity: 0.2; } }

    .pt-head {
      position: absolute; left: 22px; right: 22px; bottom: 20px; z-index: 2;
      display: flex; align-items: center; gap: 12px;
    }
    .pt-head h3 { margin: 0; color: #fff; font-size: 1.35rem; font-weight: 600; line-height: 1.2; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); }
    .pt-icon {
      flex: none; display: inline-flex; align-items: center; justify-content: center;
      width: 42px; height: 42px; border-radius: 10px;
      background: var(--drv-green);
      mat-icon { color: var(--drv-on-green); }
    }

    .pt-body { flex: 1; display: flex; flex-direction: column; gap: 10px; padding: 18px 22px 20px; }
    .pt-body p { margin: 0; }
    .pt-eyebrow { color: var(--drv-green-deep); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
    .pt-desc { color: var(--drv-text); font-size: 1rem; line-height: 1.6; }
    .pt-point {
      display: flex; gap: 8px; align-items: flex-start;
      color: var(--drv-muted); font-size: 0.93rem; line-height: 1.55;
      padding-top: 10px; border-top: 1px solid var(--drv-line);
      mat-icon { flex: none; color: var(--drv-green); font-size: 20px; width: 20px; height: 20px; margin-top: 1px; }
    }
    .pt-link {
      margin-top: auto; padding-top: 6px;
      display: inline-flex; align-items: center; gap: 4px;
      color: var(--drv-navy); font-weight: 600; font-size: 0.95rem; text-decoration: none;
      mat-icon { font-size: 18px; width: 18px; height: 18px; transition: transform 0.2s ease; }
    }
    .pt-link:hover { color: var(--drv-green-deep); }
    .pt-link:hover mat-icon { transform: translateX(3px); }

    @media (prefers-reduced-motion: reduce) {
      .pt, .pt-media img, .pt-dot { transition: none; animation: none; }
    }
  `,
})
export class PropertyTypeCard {
  readonly data = input.required<CardItemInterface>();

  /** Photo, icon and crop: the record's own image when usable, otherwise matched by title. */
  protected readonly look = computed(() => {
    const d = this.data();
    const match = PROPERTY_LOOKS.find(l => l.re.test(d.title || d.name || ''));
    const own = d.img && !UNUSABLE_IMG.test(d.img) ? d.img : '';
    return {
      img: own || match?.img || '/assets/backgrounds/surveil-Bnr.webp',
      icon: (d as any).icon || match?.icon || 'videocam',
      pos: match?.pos || 'center',
    };
  });

  protected readonly chip = computed(() => (this.data().name && this.data().name!.length <= 24 ? this.data().name! : 'Live coverage'));
}
