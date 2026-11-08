import { Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSESSMENT_HREF } from './nav-links';
import { HERO_SCENES, HeroPage } from './hero-scenes';

/**
 * Animated page banner built on each page's photorealistic banner image.
 * Overlays (glows, scan lines, data pulses, rings, LEDs, particles) are drawn in the
 * photo's own coordinate space from hero-scenes.ts, so they stay aligned at any size.
 * All motion is CSS/SMIL and is switched off for prefers-reduced-motion.
 */
@Component({
  selector: 'drv-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
<section class="drv-hero" [attr.aria-label]="page().eyebrow">
  <svg class="stage" [attr.viewBox]="scene().viewBox" [attr.preserveAspectRatio]="scene().align + ' slice'" aria-hidden="true">
    <defs>
      @for (s of scene().scans; track $index) {
        <clipPath [attr.id]="'hb-clip-' + $index"><rect [attr.x]="s.x" [attr.y]="s.y" [attr.width]="s.w" [attr.height]="s.h" rx="3"/></clipPath>
      }
      <filter id="hb-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>
      <linearGradient id="hb-scan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7fffc2" stop-opacity="0"/><stop offset=".85" stop-color="#7fffc2" stop-opacity=".35"/><stop offset="1" stop-color="#c8ffe6" stop-opacity=".8"/>
      </linearGradient>
      <linearGradient id="hb-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#bfe8ff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="hb-fadeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".16" stop-color="#fff" stop-opacity="1"/></linearGradient>
      <mask id="hb-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024"><rect width="1536" height="1024" fill="url(#hb-fadeG)"/></mask>
    </defs>

    <g class="kenburns">
      <image [attr.href]="scene().img" x="0" y="0" width="1536" height="1024" [attr.mask]="scene().fade ? 'url(#hb-fade)' : null"/>

      @for (g of scene().glows; track $index) {
        <rect class="glow" [class.soft]="g.soft" [attr.x]="g.x" [attr.y]="g.y" [attr.width]="g.w" [attr.height]="g.h" [attr.rx]="g.rx"
              [attr.fill]="g.color" filter="url(#hb-blur)" [style.animation-duration.s]="g.dur"/>
        @if (g.frame) {
          <rect class="frame" [attr.x]="g.x + 2" [attr.y]="g.y + 2" [attr.width]="g.w - 4" [attr.height]="g.h - 4" [attr.rx]="g.rx > 4 ? g.rx - 2 : 2"
                [style.animation-duration.s]="g.dur"/>
        }
      }

      @for (s of scene().scans; track $index) {
        <g [attr.clip-path]="'url(#hb-clip-' + $index + ')'">
          <rect class="scan" [attr.x]="s.x" [attr.y]="s.y - s.band" [attr.width]="s.w" [attr.height]="s.band" fill="url(#hb-scan)"
                [style.--travel.px]="s.h + s.band" [style.animation-duration.s]="s.dur"/>
        </g>
      }

      @for (r of scene().rings; track $index) {
        <circle class="ring" [class.rev]="r.reverse" [attr.cx]="r.cx" [attr.cy]="r.cy" [attr.r]="r.r" [attr.stroke-dasharray]="r.dash"
                [style.transform-origin]="r.cx + 'px ' + r.cy + 'px'" [style.animation-duration.s]="r.dur"/>
      }

      @for (t of scene().traces; track $index) {
        <path class="trace" [attr.id]="'hb-tr-' + $index" [attr.d]="t.d"/>
        <circle r="3.2" class="pkt"><animateMotion [attr.dur]="t.dur + 's'" begin="0s" repeatCount="indefinite"><mpath [attr.href]="'#hb-tr-' + $index"/></animateMotion></circle>
        <circle r="3.2" class="pkt"><animateMotion [attr.dur]="t.dur + 's'" [attr.begin]="(-t.dur / 2) + 's'" repeatCount="indefinite"><mpath [attr.href]="'#hb-tr-' + $index"/></animateMotion></circle>
      }

      @for (d of scene().dots; track $index) {
        <circle class="dot" [class.rec]="d.rec" [attr.cx]="d.x" [attr.cy]="d.y" r="4.5" [attr.fill]="d.color" [style.color]="d.color"/>
      }

      @for (p of scene().particles; track $index) {
        <circle class="bokeh" [attr.cx]="p.x" [attr.cy]="p.y" [attr.r]="p.r" [attr.fill]="p.c"
                [style.animation-duration.s]="p.dur" [style.animation-delay.s]="-p.delay"/>
      }

      <rect class="sweep" x="-400" [attr.y]="scene().sweep.y" width="300" [attr.height]="scene().sweep.h" fill="url(#hb-sheen)"/>
    </g>
  </svg>

  <div class="status-chip" aria-hidden="true">
    <span class="live"><i></i>LIVE</span>
    <span class="sep"></span>
    <span class="extra">{{ page().chip }}</span>
    <span class="sep extra"></span>
    <span class="clock">{{ clock() }}</span>
  </div>

  <div class="copy">
    <span class="eyebrow"><span class="pulse"></span>{{ page().eyebrow }}</span>
    <h1>{{ page().titleLead }} <span>{{ page().titleAccent }}</span></h1>
    <p>{{ page().text }}</p>
    <div class="actions">
      <a class="btn primary" [href]="assessmentHref">Get a Free Assessment</a>
      <a class="btn ghost" [routerLink]="page().secondary.route"
         [queryParams]="page().secondary.audience ? { for: page().secondary.audience } : null">{{ page().secondary.label }}</a>
    </div>
  </div>
</section>
`,
  styles: [`
:host { display: block; width: calc(100% + 40px); margin: -1rem -20px 0; }
.drv-hero { position: relative; width: 100%; aspect-ratio: 1536 / 680; min-height: 440px; max-height: 720px; overflow: hidden; background: #060b1c; color: #fff; font-family: Roboto, 'Helvetica Neue', Arial, sans-serif; isolation: isolate; }
.drv-hero .stage { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.drv-hero .kenburns { transform-origin: 60% 55%; transform-box: view-box; animation: kenburns 28s ease-in-out infinite alternate; }

.drv-hero .pkt { fill: #c9f6ff; filter: drop-shadow(0 0 5px #4fd2ff) drop-shadow(0 0 2px #fff); }
.drv-hero .bokeh { mix-blend-mode: screen; opacity: 0; animation: rise 12s linear infinite; }

/* readability shade for the headline */
.drv-hero::before { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(90deg, rgba(4,8,22,.86) 0%, rgba(4,8,22,.62) 26%, rgba(4,8,22,.15) 46%, rgba(4,8,22,0) 60%),
    linear-gradient(180deg, rgba(4,8,22,.35) 0%, rgba(4,8,22,0) 30%, rgba(4,8,22,0) 75%, rgba(4,8,22,.55) 100%); }

.drv-hero .copy { position: absolute; z-index: 3; left: clamp(20px, 5vw, 96px); top: 46%; transform: translateY(-50%); max-width: min(560px, 44%); }
.drv-hero .eyebrow { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .8rem; border: 1px solid rgba(57,255,143,.45); border-radius: 999px; color: #39ff8f; font: 600 .78rem/1 monospace; letter-spacing: .12em; text-transform: uppercase; background: rgba(57,255,143,.08); backdrop-filter: blur(6px); }
.drv-hero .eyebrow .pulse { width: 7px; height: 7px; border-radius: 50%; background: #39ff8f; animation: pulse 1.8s ease-out infinite; }
.drv-hero h1 { margin: 1rem 0 .75rem; font-size: clamp(2.1rem, 3.6vw, 4rem); line-height: 1.05; font-weight: 800; letter-spacing: -.02em; text-shadow: 0 4px 30px rgba(0,0,0,.6); }
.drv-hero h1 span { display: block; background: linear-gradient(90deg, #fff, #9fffc9); -webkit-background-clip: text; background-clip: text; color: transparent; }
.drv-hero p { margin: 0 0 1.6rem; font-size: clamp(1rem, 1.2vw, 1.22rem); line-height: 1.55; color: rgba(255,255,255,.86); max-width: 34ch; text-shadow: 0 2px 12px rgba(0,0,0,.6); }
.drv-hero .actions { display: flex; gap: .8rem; flex-wrap: wrap; }
.drv-hero .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .85rem 1.5rem; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 1rem; transition: transform .2s, box-shadow .2s, background .2s; }
.drv-hero .btn.primary { background: #2ecc71; color: #fff; box-shadow: 0 8px 30px rgba(46,204,113,.35); }
.drv-hero .btn.primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(46,204,113,.5); }
.drv-hero .btn.ghost { color: #fff; border: 1px solid rgba(255,255,255,.4); background: rgba(255,255,255,.08); backdrop-filter: blur(6px); }
.drv-hero .btn.ghost:hover { background: rgba(255,255,255,.16); }

.drv-hero .status-chip { position: absolute; z-index: 3; top: 22px; right: clamp(16px, 3vw, 48px); display: flex; align-items: center; gap: .6rem; padding: .5rem .9rem; border-radius: 10px; font: 500 .74rem/1 'Roboto Mono', monospace; letter-spacing: .06em; color: #d8ecff; background: rgba(8,18,40,.55); border: 1px solid rgba(120,200,255,.3); backdrop-filter: blur(8px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }
.drv-hero .status-chip .live { display: inline-flex; align-items: center; gap: .35rem; color: #39ff8f; font-weight: 700; }
.drv-hero .status-chip .live i { width: 7px; height: 7px; border-radius: 50%; background: #39ff8f; box-shadow: 0 0 6px #39ff8f; animation: blink 1.4s ease-in-out infinite; }
.drv-hero .status-chip .sep { width: 1px; height: 12px; background: rgba(255,255,255,.25); }
.drv-hero .status-chip .clock { color: #fff; min-width: 7ch; }

@keyframes kenburns { from { transform: scale(1) translate(0,0); } to { transform: scale(1.06) translate(-14px, -6px); } }
@keyframes glow { 0%,100% { opacity: .05 } 50% { opacity: .38 } }
@keyframes frame { 0%,100% { opacity: 0 } 50% { opacity: .55 } }
@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .2 } }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(57,255,143,.7) } 100% { box-shadow: 0 0 0 10px rgba(57,255,143,0) } }
@keyframes rise { 0% { opacity: 0; transform: translateY(0) } 15% { opacity: .75 } 85% { opacity: .5 } 100% { opacity: 0; transform: translateY(-140px) } }
@keyframes sweep { 0%, 55% { transform: skewX(-18deg) translateX(0) } 100% { transform: skewX(-18deg) translateX(2300px) } }

@media (max-width: 900px) {
  .drv-hero .status-chip .extra { display: none; }
  .drv-hero .copy { max-width: 70%; }
}
@media (max-width: 640px) {
  .drv-hero { aspect-ratio: auto; min-height: 540px; }
  .drv-hero::before { background: linear-gradient(180deg, rgba(4,8,22,.88) 0%, rgba(4,8,22,.72) 55%, rgba(4,8,22,.3) 100%); }
  .drv-hero .copy { top: auto; bottom: 36px; transform: none; max-width: none; right: 20px; }
  .drv-hero .status-chip { top: 14px; right: 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .drv-hero *, .drv-hero *::before { animation: none !important; }
}

.drv-hero .glow { opacity: .05; mix-blend-mode: screen; animation: glow 3.6s ease-in-out infinite; }
.drv-hero .glow.soft { animation-name: glowSoft; }
.drv-hero .frame { fill: none; stroke: #8fe3ff; stroke-width: 1.5; opacity: 0; animation: frame 3.6s ease-in-out infinite; }
.drv-hero .scan { mix-blend-mode: screen; animation: scan 3.4s linear infinite; }
.drv-hero .dot { animation: blink 2s ease-in-out infinite; filter: drop-shadow(0 0 5px currentColor); }
.drv-hero .dot.rec { animation: blink 1.2s steps(2) infinite; }
.drv-hero .ring { fill: none; stroke: #39ff8f; stroke-width: 4; stroke-linecap: round; opacity: .8; filter: drop-shadow(0 0 6px #39ff8f); animation: spin 4s linear infinite; }
.drv-hero .ring.rev { animation-direction: reverse; stroke: #7fd7ff; filter: drop-shadow(0 0 6px #7fd7ff); }
.drv-hero .trace { fill: none; stroke: none; }
.drv-hero .sweep { mix-blend-mode: screen; transform: skewX(-18deg); animation: sweep 9s ease-in-out infinite; }
@keyframes glowSoft { 0%,100% { opacity: .03 } 50% { opacity: .2 } }
@keyframes scan { from { transform: translateY(0) } to { transform: translateY(var(--travel)) } }
@keyframes spin { to { transform: rotate(360deg) } }

  `],
})
export class HeroBanner {
  readonly page = input.required<HeroPage>();
  protected readonly scene = computed(() => HERO_SCENES[this.page().scene]);
  protected readonly assessmentHref = ASSESSMENT_HREF;
  protected readonly clock = signal('--:--:--');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Browser only (skipped during SSR prerender).
    afterNextRender(() => {
      const tick = () => this.clock.set(new Date().toLocaleTimeString('en-US', { hour12: false }));
      tick();
      const id = setInterval(tick, 1000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
