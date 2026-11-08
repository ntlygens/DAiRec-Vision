import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSESSMENT_HREF } from './nav-links';

/**
 * Animated hero for landing/home, built on the photorealistic landing-Bnr.webp.
 * SVG overlays share the image's 1536x1024 coordinate space, so glows, scan lines and
 * data pulses stay locked to the photo's own HUD at any screen size.
 * Animations are CSS/SMIL and are disabled for prefers-reduced-motion.
 */
@Component({
  selector: 'drv-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
<section class="drv-hero" aria-label="DaiRec Vision Security">
  <svg class="stage" viewBox="0 180 1536 680" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <clipPath id="cam02"><rect x="42" y="582" width="212" height="122" rx="3"/></clipPath>
      <clipPath id="cam04"><rect x="1124" y="574" width="316" height="160" rx="3"/></clipPath>
      <filter id="blur12" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>
      <filter id="blur3"><feGaussianBlur stdDeviation="2.5"/></filter>
      <linearGradient id="scanG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7fffc2" stop-opacity="0"/><stop offset=".85" stop-color="#7fffc2" stop-opacity=".35"/><stop offset="1" stop-color="#c8ffe6" stop-opacity=".8"/>
      </linearGradient>
      <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#bfe8ff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <g class="kenburns">
      <image href="/assets/backgrounds/landing-Bnr.webp" x="0" y="0" width="1536" height="1024" preserveAspectRatio="xMidYMid slice"/>

      <!-- glows on the photo's own HUD elements -->
      <rect class="glow lock" x="584" y="564" width="190" height="234" rx="14" fill="#38c8ff" filter="url(#blur12)"/>
      <rect class="glow alert" x="876" y="636" width="222" height="144" rx="12" fill="#ff9a3c" filter="url(#blur12)"/>
      <rect class="frame lock-frame" x="586" y="566" width="186" height="230" rx="10"/>

      <!-- scan lines over the camera screens -->
      <g clip-path="url(#cam02)"><rect class="scan s02" x="42" y="540" width="212" height="42" fill="url(#scanG)"/></g>
      <g clip-path="url(#cam04)"><rect class="scan s04" x="1124" y="520" width="316" height="54" fill="url(#scanG)"/></g>
      <circle class="rec" cx="246" cy="560" r="4.5"/>
      <circle class="rec" cx="1430" cy="560" r="4.5" style="animation-delay:-.6s"/>

      <!-- data pulses along the circuit traces -->
      <g class="traces">
      <path id="tr0" d="M266 735 L420 735 L470 760 L584 760" class="trace"/>
      <circle r="3.2" class="pkt"><animateMotion dur="4.5s" begin="-0.00s" repeatCount="indefinite"><mpath href="#tr0"/></animateMotion></circle>
      <circle r="3.2" class="pkt"><animateMotion dur="4.5s" begin="-2.25s" repeatCount="indefinite"><mpath href="#tr0"/></animateMotion></circle>
      <path id="tr1" d="M774 690 L830 690 L860 712 L876 712" class="trace"/>
      <circle r="3.2" class="pkt"><animateMotion dur="3.2s" begin="-0.00s" repeatCount="indefinite"><mpath href="#tr1"/></animateMotion></circle>
      <circle r="3.2" class="pkt"><animateMotion dur="3.2s" begin="-1.60s" repeatCount="indefinite"><mpath href="#tr1"/></animateMotion></circle>
      <path id="tr2" d="M1098 700 L1124 690" class="trace"/>
      <circle r="3.2" class="pkt"><animateMotion dur="2.2s" begin="-0.00s" repeatCount="indefinite"><mpath href="#tr2"/></animateMotion></circle>
      <circle r="3.2" class="pkt"><animateMotion dur="2.2s" begin="-1.10s" repeatCount="indefinite"><mpath href="#tr2"/></animateMotion></circle>
      <path id="tr3" d="M300 805 L520 805 L560 830 L760 830 L800 805 L1000 805" class="trace"/>
      <circle r="3.2" class="pkt"><animateMotion dur="6s" begin="-0.00s" repeatCount="indefinite"><mpath href="#tr3"/></animateMotion></circle>
      <circle r="3.2" class="pkt"><animateMotion dur="6s" begin="-3.00s" repeatCount="indefinite"><mpath href="#tr3"/></animateMotion></circle>
      <path id="tr4" d="M600 800 L640 845 L900 845 L960 820 L1180 820" class="trace"/>
      <circle r="3.2" class="pkt"><animateMotion dur="5.2s" begin="-0.00s" repeatCount="indefinite"><mpath href="#tr4"/></animateMotion></circle>
      <circle r="3.2" class="pkt"><animateMotion dur="5.2s" begin="-2.60s" repeatCount="indefinite"><mpath href="#tr4"/></animateMotion></circle>
      </g>

      <!-- wall camera status LED -->
      <circle class="camled" cx="1336" cy="214" r="4"/>
      <circle class="camled halo" cx="1336" cy="214" r="12"/>

      <!-- floating light particles -->
      <g class="particles">
      <circle class="bokeh" cx="761" cy="833" r="4.3" fill="#9ff5ff" style="animation-duration:12.1s;animation-delay:-4.7s"/>
      <circle class="bokeh" cx="399" cy="815" r="3.4" fill="#ffd58a" style="animation-duration:8.8s;animation-delay:-7.9s"/>
      <circle class="bokeh" cx="341" cy="825" r="4.2" fill="#7fffc2" style="animation-duration:12.8s;animation-delay:-6.3s"/>
      <circle class="bokeh" cx="1452" cy="868" r="3.3" fill="#7fd7ff" style="animation-duration:8.1s;animation-delay:-1.6s"/>
      <circle class="bokeh" cx="230" cy="692" r="2.2" fill="#7fffc2" style="animation-duration:11.7s;animation-delay:-0.3s"/>
      <circle class="bokeh" cx="948" cy="694" r="2.2" fill="#7fd7ff" style="animation-duration:8.0s;animation-delay:-2.9s"/>
      <circle class="bokeh" cx="767" cy="726" r="4.5" fill="#ffd58a" style="animation-duration:14.7s;animation-delay:-10.0s"/>
      <circle class="bokeh" cx="576" cy="707" r="2.4" fill="#7fffc2" style="animation-duration:14.1s;animation-delay:-0.7s"/>
      <circle class="bokeh" cx="296" cy="731" r="1.7" fill="#9ff5ff" style="animation-duration:13.5s;animation-delay:-0.2s"/>
      <circle class="bokeh" cx="433" cy="966" r="2.9" fill="#7fd7ff" style="animation-duration:11.2s;animation-delay:-9.8s"/>
      <circle class="bokeh" cx="914" cy="695" r="3.5" fill="#7fd7ff" style="animation-duration:10.5s;animation-delay:-3.4s"/>
      <circle class="bokeh" cx="1452" cy="908" r="1.9" fill="#7fd7ff" style="animation-duration:8.8s;animation-delay:-2.5s"/>
      <circle class="bokeh" cx="778" cy="805" r="3.5" fill="#9ff5ff" style="animation-duration:12.1s;animation-delay:-1.9s"/>
      <circle class="bokeh" cx="716" cy="766" r="2.7" fill="#ffd58a" style="animation-duration:8.0s;animation-delay:-9.9s"/>
      <circle class="bokeh" cx="1497" cy="627" r="2.1" fill="#7fd7ff" style="animation-duration:12.8s;animation-delay:-10.0s"/>
      <circle class="bokeh" cx="207" cy="676" r="2.8" fill="#ffd58a" style="animation-duration:12.9s;animation-delay:-0.1s"/>
      <circle class="bokeh" cx="671" cy="648" r="2.1" fill="#ffd58a" style="animation-duration:8.1s;animation-delay:-6.4s"/>
      <circle class="bokeh" cx="652" cy="792" r="4.4" fill="#7fffc2" style="animation-duration:12.6s;animation-delay:-4.8s"/>
      <circle class="bokeh" cx="397" cy="679" r="4.2" fill="#9ff5ff" style="animation-duration:10.0s;animation-delay:-8.2s"/>
      <circle class="bokeh" cx="364" cy="859" r="3.2" fill="#7fffc2" style="animation-duration:11.1s;animation-delay:-6.9s"/>
      <circle class="bokeh" cx="965" cy="780" r="1.8" fill="#9ff5ff" style="animation-duration:15.7s;animation-delay:-0.4s"/>
      <circle class="bokeh" cx="1149" cy="769" r="2.8" fill="#9ff5ff" style="animation-duration:11.9s;animation-delay:-9.0s"/>
      <circle class="bokeh" cx="1404" cy="991" r="1.9" fill="#7fd7ff" style="animation-duration:13.2s;animation-delay:-4.8s"/>
      <circle class="bokeh" cx="528" cy="969" r="2.1" fill="#7fffc2" style="animation-duration:10.2s;animation-delay:-0.2s"/>
      <circle class="bokeh" cx="486" cy="638" r="2.3" fill="#7fd7ff" style="animation-duration:15.8s;animation-delay:-5.3s"/>
      <circle class="bokeh" cx="639" cy="959" r="4.4" fill="#9ff5ff" style="animation-duration:13.5s;animation-delay:-6.6s"/>
      <circle class="bokeh" cx="946" cy="971" r="2.9" fill="#7fd7ff" style="animation-duration:10.5s;animation-delay:-3.6s"/>
      <circle class="bokeh" cx="179" cy="862" r="2.9" fill="#7fd7ff" style="animation-duration:10.6s;animation-delay:-7.3s"/>
      <circle class="bokeh" cx="252" cy="828" r="3.7" fill="#9ff5ff" style="animation-duration:13.9s;animation-delay:-9.0s"/>
      <circle class="bokeh" cx="1221" cy="968" r="2.6" fill="#7fffc2" style="animation-duration:15.2s;animation-delay:-6.9s"/>
      <circle class="bokeh" cx="1425" cy="632" r="3.0" fill="#7fffc2" style="animation-duration:13.3s;animation-delay:-0.1s"/>
      <circle class="bokeh" cx="937" cy="851" r="1.7" fill="#7fffc2" style="animation-duration:15.9s;animation-delay:-6.4s"/>
      <circle class="bokeh" cx="1133" cy="768" r="3.7" fill="#7fd7ff" style="animation-duration:11.5s;animation-delay:-5.8s"/>
      <circle class="bokeh" cx="850" cy="816" r="2.4" fill="#7fd7ff" style="animation-duration:8.2s;animation-delay:-0.9s"/>
      </g>

      <!-- periodic light sweep across the HUD -->
      <rect class="sweep" x="-400" y="520" width="300" height="360" fill="url(#sheen)" transform="skewX(-18)"/>
    </g>
  </svg>

  <div class="status-chip" aria-hidden="true">
    <span class="live"><i></i>LIVE</span>
    <span class="sep"></span>
    <span class="extra">ALL SYSTEMS ARMED · 24/24 CAMERAS</span>
    <span class="sep extra"></span>
    <span class="clock">{{ clock() }}</span>
  </div>

  <div class="copy">
    <span class="eyebrow"><span class="pulse"></span>24/7 Intelligent Security</span>
    <h1>Protect What <span>Matters Most</span></h1>
    <p>Cameras, access control, remote monitoring and drone patrols for homes and enterprises, all managed from one place.</p>
    <div class="actions">
      <a class="btn primary" [href]="assessmentHref">Get a Free Assessment</a>
      <a class="btn ghost" routerLink="/plans">View Plans</a>
    </div>
  </div>
</section>
  `,
  styles: [`
:host { display: block; width: calc(100% + 40px); margin: -1rem -20px 0; }
.drv-hero { position: relative; width: 100%; aspect-ratio: 1536 / 680; min-height: 440px; max-height: 720px; overflow: hidden; background: #060b1c; color: #fff; font-family: Roboto, 'Helvetica Neue', Arial, sans-serif; isolation: isolate; }
.drv-hero .stage { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.drv-hero .kenburns { transform-origin: 60% 55%; transform-box: view-box; animation: kenburns 28s ease-in-out infinite alternate; }

.drv-hero .glow { opacity: .0; mix-blend-mode: screen; animation: glow 3.6s ease-in-out infinite; }
.drv-hero .glow.alert { animation-duration: 2.2s; animation-delay: -1s; }
.drv-hero .lock-frame { fill: none; stroke: #8fe3ff; stroke-width: 1.5; opacity: 0; animation: frame 3.6s ease-in-out infinite; }
.drv-hero .scan { mix-blend-mode: screen; animation: scan02 3.4s linear infinite; }
.drv-hero .s04 { animation-name: scan04; animation-duration: 4.2s; }
.drv-hero .rec { fill: #ff4d5e; filter: drop-shadow(0 0 4px #ff4d5e); animation: blink 1.2s steps(2) infinite; }
.drv-hero .trace { fill: none; stroke: #6fd8ff; stroke-opacity: .0; stroke-width: 1; }
.drv-hero .pkt { fill: #c9f6ff; filter: drop-shadow(0 0 5px #4fd2ff) drop-shadow(0 0 2px #fff); }
.drv-hero .camled { fill: #39ff8f; animation: blink 2s ease-in-out infinite; }
.drv-hero .camled.halo { fill: #39ff8f; opacity: .25; filter: blur(4px); }
.drv-hero .bokeh { mix-blend-mode: screen; opacity: 0; animation: rise 12s linear infinite; }
.drv-hero .sweep { mix-blend-mode: screen; animation: sweep 9s ease-in-out infinite; }

/* readability shade for the headline */
.drv-hero::before { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background:
    linear-gradient(90deg, rgba(4,8,22,.86) 0%, rgba(4,8,22,.62) 26%, rgba(4,8,22,.15) 46%, rgba(4,8,22,0) 60%),
    linear-gradient(180deg, rgba(4,8,22,.35) 0%, rgba(4,8,22,0) 30%, rgba(4,8,22,0) 75%, rgba(4,8,22,.55) 100%); }

.drv-hero .copy { position: absolute; z-index: 3; left: clamp(20px, 5vw, 96px); top: 46%; transform: translateY(-50%); max-width: min(560px, 44%); }
.drv-hero .eyebrow { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .8rem; border: 1px solid rgba(57,255,143,.45); border-radius: 999px; color: #39ff8f; font: 600 .78rem/1 monospace; letter-spacing: .12em; text-transform: uppercase; background: rgba(57,255,143,.08); backdrop-filter: blur(6px); }
.drv-hero .eyebrow .pulse { width: 7px; height: 7px; border-radius: 50%; background: #39ff8f; animation: pulse 1.8s ease-out infinite; }
.drv-hero h1 { margin: 1rem 0 .75rem; font-size: clamp(2.1rem, 3.6vw, 4rem); line-height: 1.05; font-weight: 800; letter-spacing: -.02em; text-shadow: 0 4px 30px rgba(0,0,0,.6); }
.drv-hero h1 span { background: linear-gradient(90deg, #fff, #9fffc9); -webkit-background-clip: text; background-clip: text; color: transparent; }
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
@keyframes scan02 { from { transform: translateY(0) } to { transform: translateY(170px) } }
@keyframes scan04 { from { transform: translateY(0) } to { transform: translateY(220px) } }
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

  `],
})
export class HeroBanner {
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
