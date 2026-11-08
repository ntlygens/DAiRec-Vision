import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ASSESSMENT_HREF } from './nav-links';

/**
 * Code-built animated hero banner (1920x600 design, responsive).
 * Scene: blue-hour home -> office skyline with integrated cameras and access panels;
 * foreground holographic HUD with live feeds, status ring and scrolling access log.
 * All animation is CSS/SVG and is disabled for users who prefer reduced motion.
 */
@Component({
  selector: 'drv-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
<section class="drv-hero" aria-label="DaiRec Vision Security">
  <svg class="scene" viewBox="0 0 1920 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070c22"/><stop offset=".45" stop-color="#1a1847"/>
      <stop offset=".78" stop-color="#3b2768"/><stop offset="1" stop-color="#6a4a8c"/>
    </linearGradient>
    <radialGradient id="horizonGlow" cx=".72" cy="1" r=".6">
      <stop offset="0" stop-color="#b47ab8" stop-opacity=".55"/><stop offset="1" stop-color="#b47ab8" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd58a"/><stop offset="1" stop-color="#f0a447"/>
    </linearGradient>
    <linearGradient id="warm2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffcf7f"/><stop offset="1" stop-color="#c97b32"/>
    </linearGradient>
    <linearGradient id="door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd58a" stop-opacity=".9"/><stop offset="1" stop-color="#b8742f"/></linearGradient>
    <linearGradient id="homeWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4157"/><stop offset="1" stop-color="#22273a"/></linearGradient>
    <linearGradient id="homeUpper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd4de"/><stop offset="1" stop-color="#9aa1b3"/></linearGradient>
    <linearGradient id="towerFace" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2b3556"/><stop offset="1" stop-color="#1c2442"/></linearGradient>
    <linearGradient id="towerSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#151b33"/><stop offset="1" stop-color="#0e1326"/></linearGradient>
    <linearGradient id="lobby" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2a8"/><stop offset="1" stop-color="#e0a050"/></linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f4f8"/><stop offset="1" stop-color="#8d97ab"/></linearGradient>
    <linearGradient id="pool" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2fd3e6" stop-opacity=".25"/><stop offset=".5" stop-color="#5ff0ff" stop-opacity=".55"/><stop offset="1" stop-color="#2fd3e6" stop-opacity=".2"/></linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a33"/><stop offset="1" stop-color="#05080f"/></linearGradient>
    <linearGradient id="textShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#050916" stop-opacity=".88"/><stop offset=".3" stop-color="#050916" stop-opacity=".55"/><stop offset=".48" stop-color="#050916" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#39ff8f" stop-opacity="0"/><stop offset=".5" stop-color="#39ff8f" stop-opacity=".9"/><stop offset="1" stop-color="#39ff8f" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="0.9"/></filter>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <rect width="1920" height="600" fill="url(#sky)"/>
  <rect width="1920" height="600" fill="url(#horizonGlow)"/>
  <g class="stars" fill="#e6ecff"><circle class="star" cx="622" cy="45" r="0.6" opacity="0.64" style="animation-delay:0.4s"/>
<circle class="star" cx="702" cy="17" r="1.5" opacity="0.40" style="animation-delay:1.3s"/>
<circle class="star" cx="803" cy="72" r="1.5" opacity="0.80" style="animation-delay:2.5s"/>
<circle class="star" cx="238" cy="67" r="1.5" opacity="0.67" style="animation-delay:5.7s"/>
<circle class="star" cx="762" cy="293" r="0.6" opacity="0.42" style="animation-delay:3.3s"/>
<circle class="star" cx="805" cy="162" r="1.5" opacity="0.80" style="animation-delay:1.9s"/>
<circle class="star" cx="347" cy="174" r="0.8" opacity="0.65" style="animation-delay:2.2s"/>
<circle class="star" cx="121" cy="18" r="0.8" opacity="0.64" style="animation-delay:3.0s"/>
<circle class="star" cx="1492" cy="140" r="1.2" opacity="0.49" style="animation-delay:2.2s"/>
<circle class="star" cx="345" cy="234" r="0.6" opacity="0.64" style="animation-delay:3.4s"/>
<circle class="star" cx="1680" cy="219" r="1" opacity="0.39" style="animation-delay:3.7s"/>
<circle class="star" cx="983" cy="49" r="1" opacity="0.62" style="animation-delay:0.9s"/>
<circle class="star" cx="75" cy="200" r="1.5" opacity="0.83" style="animation-delay:3.4s"/>
<circle class="star" cx="602" cy="209" r="1.5" opacity="0.79" style="animation-delay:3.0s"/>
<circle class="star" cx="132" cy="28" r="1" opacity="0.72" style="animation-delay:2.8s"/>
<circle class="star" cx="116" cy="210" r="1.5" opacity="0.80" style="animation-delay:6.0s"/>
<circle class="star" cx="546" cy="116" r="1" opacity="0.60" style="animation-delay:0.1s"/>
<circle class="star" cx="323" cy="35" r="0.6" opacity="0.51" style="animation-delay:1.3s"/>
<circle class="star" cx="1418" cy="119" r="1.2" opacity="0.60" style="animation-delay:0.5s"/>
<circle class="star" cx="1055" cy="265" r="1.2" opacity="0.50" style="animation-delay:5.2s"/>
<circle class="star" cx="797" cy="108" r="1.2" opacity="0.43" style="animation-delay:5.7s"/>
<circle class="star" cx="338" cy="70" r="0.8" opacity="0.81" style="animation-delay:0.1s"/>
<circle class="star" cx="350" cy="85" r="0.8" opacity="0.55" style="animation-delay:2.5s"/>
<circle class="star" cx="1087" cy="286" r="1.5" opacity="0.71" style="animation-delay:5.7s"/>
<circle class="star" cx="1420" cy="137" r="1.5" opacity="0.57" style="animation-delay:2.4s"/>
<circle class="star" cx="199" cy="190" r="0.6" opacity="0.89" style="animation-delay:1.1s"/>
<circle class="star" cx="846" cy="33" r="1.5" opacity="0.35" style="animation-delay:0.3s"/>
<circle class="star" cx="290" cy="30" r="1" opacity="0.39" style="animation-delay:3.7s"/>
<circle class="star" cx="399" cy="113" r="1" opacity="0.68" style="animation-delay:5.7s"/>
<circle class="star" cx="910" cy="35" r="1.2" opacity="0.61" style="animation-delay:6.0s"/>
<circle class="star" cx="929" cy="26" r="0.6" opacity="0.76" style="animation-delay:4.5s"/>
<circle class="star" cx="919" cy="208" r="1.5" opacity="0.87" style="animation-delay:0.1s"/>
<circle class="star" cx="1014" cy="44" r="1.5" opacity="0.77" style="animation-delay:5.5s"/>
<circle class="star" cx="572" cy="193" r="0.6" opacity="0.49" style="animation-delay:4.2s"/>
<circle class="star" cx="704" cy="50" r="0.8" opacity="0.78" style="animation-delay:3.2s"/>
<circle class="star" cx="633" cy="67" r="0.8" opacity="0.80" style="animation-delay:4.8s"/>
<circle class="star" cx="1421" cy="68" r="1.5" opacity="0.75" style="animation-delay:3.0s"/>
<circle class="star" cx="1900" cy="237" r="1.2" opacity="0.73" style="animation-delay:1.6s"/>
<circle class="star" cx="1837" cy="134" r="1" opacity="0.55" style="animation-delay:5.7s"/>
<circle class="star" cx="423" cy="68" r="0.8" opacity="0.62" style="animation-delay:2.0s"/>
<circle class="star" cx="1892" cy="183" r="0.6" opacity="0.71" style="animation-delay:2.9s"/>
<circle class="star" cx="1535" cy="25" r="0.6" opacity="0.78" style="animation-delay:5.5s"/>
<circle class="star" cx="1440" cy="143" r="0.8" opacity="0.70" style="animation-delay:2.6s"/>
<circle class="star" cx="167" cy="284" r="1.2" opacity="0.76" style="animation-delay:2.8s"/>
<circle class="star" cx="163" cy="48" r="0.8" opacity="0.67" style="animation-delay:0.2s"/>
<circle class="star" cx="893" cy="197" r="1.5" opacity="0.89" style="animation-delay:5.0s"/>
<circle class="star" cx="1262" cy="105" r="1.5" opacity="0.36" style="animation-delay:3.3s"/>
<circle class="star" cx="1535" cy="218" r="0.6" opacity="0.86" style="animation-delay:3.2s"/>
<circle class="star" cx="833" cy="262" r="0.8" opacity="0.47" style="animation-delay:0.2s"/>
<circle class="star" cx="962" cy="229" r="1" opacity="0.58" style="animation-delay:1.6s"/>
<circle class="star" cx="252" cy="273" r="1" opacity="0.71" style="animation-delay:5.4s"/>
<circle class="star" cx="1565" cy="155" r="1.5" opacity="0.43" style="animation-delay:0.8s"/>
<circle class="star" cx="980" cy="262" r="0.8" opacity="0.78" style="animation-delay:3.7s"/>
<circle class="star" cx="288" cy="42" r="1.5" opacity="0.66" style="animation-delay:4.4s"/>
<circle class="star" cx="626" cy="156" r="1.5" opacity="0.78" style="animation-delay:2.9s"/>
<circle class="star" cx="1696" cy="17" r="0.8" opacity="0.77" style="animation-delay:1.7s"/>
<circle class="star" cx="975" cy="169" r="0.6" opacity="0.69" style="animation-delay:2.7s"/>
<circle class="star" cx="971" cy="154" r="1" opacity="0.64" style="animation-delay:2.7s"/>
<circle class="star" cx="918" cy="282" r="1.5" opacity="0.87" style="animation-delay:5.3s"/>
<circle class="star" cx="498" cy="168" r="0.8" opacity="0.43" style="animation-delay:5.0s"/>
<circle class="star" cx="234" cy="133" r="0.6" opacity="0.59" style="animation-delay:4.0s"/>
<circle class="star" cx="408" cy="91" r="0.6" opacity="0.43" style="animation-delay:5.4s"/>
<circle class="star" cx="1375" cy="198" r="0.8" opacity="0.43" style="animation-delay:1.5s"/>
<circle class="star" cx="898" cy="224" r="0.6" opacity="0.62" style="animation-delay:2.4s"/>
<circle class="star" cx="1901" cy="250" r="0.8" opacity="0.90" style="animation-delay:4.2s"/>
<circle class="star" cx="775" cy="126" r="1" opacity="0.75" style="animation-delay:1.9s"/>
<circle class="star" cx="37" cy="166" r="1.2" opacity="0.56" style="animation-delay:4.2s"/>
<circle class="star" cx="993" cy="89" r="0.6" opacity="0.86" style="animation-delay:0.7s"/>
<circle class="star" cx="439" cy="263" r="0.6" opacity="0.37" style="animation-delay:1.6s"/>
<circle class="star" cx="1496" cy="81" r="0.8" opacity="0.82" style="animation-delay:4.9s"/>
<circle class="star" cx="1298" cy="284" r="1.2" opacity="0.86" style="animation-delay:0.9s"/>
<circle class="star" cx="1096" cy="210" r="0.6" opacity="0.79" style="animation-delay:1.7s"/>
<circle class="star" cx="352" cy="269" r="1" opacity="0.70" style="animation-delay:5.6s"/>
<circle class="star" cx="1539" cy="25" r="0.8" opacity="0.82" style="animation-delay:0.4s"/>
<circle class="star" cx="871" cy="102" r="1.5" opacity="0.85" style="animation-delay:2.5s"/>
<circle class="star" cx="1194" cy="13" r="0.8" opacity="0.88" style="animation-delay:5.6s"/>
<circle class="star" cx="503" cy="54" r="1" opacity="0.64" style="animation-delay:3.8s"/>
<circle class="star" cx="395" cy="134" r="0.8" opacity="0.79" style="animation-delay:1.6s"/>
<circle class="star" cx="1909" cy="11" r="0.6" opacity="0.65" style="animation-delay:4.4s"/>
<circle class="star" cx="364" cy="142" r="1.2" opacity="0.80" style="animation-delay:0.6s"/>
<circle class="star" cx="830" cy="149" r="1.2" opacity="0.52" style="animation-delay:5.8s"/>
<circle class="star" cx="413" cy="69" r="0.8" opacity="0.74" style="animation-delay:5.0s"/>
<circle class="star" cx="1221" cy="121" r="1" opacity="0.81" style="animation-delay:5.9s"/>
<circle class="star" cx="27" cy="188" r="1" opacity="0.38" style="animation-delay:2.6s"/>
<circle class="star" cx="1277" cy="114" r="1.5" opacity="0.51" style="animation-delay:4.0s"/>
<circle class="star" cx="465" cy="88" r="1.2" opacity="0.50" style="animation-delay:1.1s"/>
<circle class="star" cx="7" cy="109" r="1" opacity="0.65" style="animation-delay:5.8s"/>
<circle class="star" cx="469" cy="290" r="1" opacity="0.45" style="animation-delay:1.3s"/>
<circle class="star" cx="644" cy="25" r="1" opacity="0.46" style="animation-delay:3.0s"/>
<circle class="star" cx="969" cy="1" r="1" opacity="0.43" style="animation-delay:4.9s"/>
<circle class="star" cx="1127" cy="118" r="1" opacity="0.48" style="animation-delay:1.8s"/>
<circle class="star" cx="1124" cy="159" r="0.8" opacity="0.74" style="animation-delay:3.9s"/>
<circle class="star" cx="1688" cy="117" r="1" opacity="0.62" style="animation-delay:4.3s"/>
<circle class="star" cx="546" cy="186" r="0.8" opacity="0.81" style="animation-delay:0.3s"/>
<circle class="star" cx="1713" cy="188" r="1.5" opacity="0.64" style="animation-delay:0.8s"/>
<circle class="star" cx="968" cy="250" r="0.6" opacity="0.67" style="animation-delay:5.0s"/>
<circle class="star" cx="1714" cy="205" r="0.8" opacity="0.37" style="animation-delay:0.5s"/>
<circle class="star" cx="1223" cy="288" r="1.2" opacity="0.66" style="animation-delay:5.0s"/>
<circle class="star" cx="1205" cy="188" r="0.8" opacity="0.35" style="animation-delay:2.9s"/>
<circle class="star" cx="1532" cy="224" r="1.5" opacity="0.40" style="animation-delay:5.4s"/>
<circle class="star" cx="1010" cy="224" r="1.2" opacity="0.39" style="animation-delay:1.5s"/>
<circle class="star" cx="510" cy="219" r="0.8" opacity="0.71" style="animation-delay:1.4s"/>
<circle class="star" cx="884" cy="254" r="0.6" opacity="0.73" style="animation-delay:2.9s"/>
<circle class="star" cx="1473" cy="185" r="0.8" opacity="0.43" style="animation-delay:0.5s"/>
<circle class="star" cx="488" cy="223" r="1" opacity="0.42" style="animation-delay:3.7s"/>
<circle class="star" cx="926" cy="146" r="0.6" opacity="0.72" style="animation-delay:4.2s"/>
<circle class="star" cx="558" cy="155" r="1.2" opacity="0.77" style="animation-delay:2.8s"/>
<circle class="star" cx="1907" cy="165" r="1" opacity="0.86" style="animation-delay:5.9s"/>
<circle class="star" cx="34" cy="138" r="1.5" opacity="0.60" style="animation-delay:5.8s"/>
<circle class="star" cx="516" cy="63" r="0.8" opacity="0.40" style="animation-delay:0.4s"/></g>
  <circle cx="880" cy="70" r="20" fill="#eef0ff" opacity=".85"/>
  <circle cx="880" cy="70" r="56" fill="#c9c6ff" opacity=".08"/>

  <!-- distant skyline -->
  <path d="M0 470 L80 470 L80 430 L130 430 L130 450 L210 450 L210 410 L250 410 L250 470 L1920 470 L1920 600 L0 600Z" fill="#10172e" opacity=".9"/>

  <g filter="url(#soft)">
    <g class="office">
<polygon points="1420,92 1640,70 1640,520 1420,520" fill="url(#towerFace)"/>
<polygon points="1640,70 1730,104 1730,520 1640,520" fill="url(#towerSide)"/>
<rect x="1420" y="84" width="220" height="6" fill="#c7d0e0" opacity=".55"/>
<rect x="1430.0" y="110" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="110" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.84"/>
<rect x="1477.0" y="110" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="110" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="110" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.78"/>
<rect x="1547.5" y="110" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1571.0" y="110" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="110" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.79"/>
<rect x="1618.0" y="110" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="128" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1477.0" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.84"/>
<rect x="1500.5" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1524.0" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1547.5" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1571.0" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.75"/>
<rect x="1594.5" y="128" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1618.0" y="128" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1430.0" y="146" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1453.5" y="146" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1477.0" y="146" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="146" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="146" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.76"/>
<rect x="1547.5" y="146" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="146" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="146" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.99"/>
<rect x="1618.0" y="146" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1430.0" y="164" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="164" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="164" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.76"/>
<rect x="1500.5" y="164" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="164" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1547.5" y="164" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="164" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1594.5" y="164" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1618.0" y="164" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.90"/>
<rect x="1430.0" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1453.5" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1477.0" y="182" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.85"/>
<rect x="1524.0" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1547.5" y="182" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="182" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1618.0" y="182" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.92"/>
<rect x="1430.0" y="200" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1453.5" y="200" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.88"/>
<rect x="1477.0" y="200" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="200" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="200" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1547.5" y="200" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="200" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.89"/>
<rect x="1594.5" y="200" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.79"/>
<rect x="1618.0" y="200" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.84"/>
<rect x="1453.5" y="218" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.76"/>
<rect x="1500.5" y="218" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1547.5" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.82"/>
<rect x="1571.0" y="218" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.89"/>
<rect x="1618.0" y="218" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.92"/>
<rect x="1430.0" y="236" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.95"/>
<rect x="1453.5" y="236" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="236" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1500.5" y="236" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1524.0" y="236" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1547.5" y="236" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="236" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="236" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1618.0" y="236" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="254" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="254" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="254" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1500.5" y="254" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="254" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="254" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1571.0" y="254" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.95"/>
<rect x="1594.5" y="254" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.79"/>
<rect x="1618.0" y="254" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="272" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.96"/>
<rect x="1453.5" y="272" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="272" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="272" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="272" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1547.5" y="272" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.78"/>
<rect x="1571.0" y="272" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="272" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1618.0" y="272" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="290" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="290" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1477.0" y="290" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="290" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1524.0" y="290" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="290" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.82"/>
<rect x="1571.0" y="290" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="290" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.88"/>
<rect x="1618.0" y="290" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1453.5" y="308" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.88"/>
<rect x="1500.5" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.76"/>
<rect x="1524.0" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1547.5" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.80"/>
<rect x="1571.0" y="308" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="308" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1618.0" y="308" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1430.0" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.84"/>
<rect x="1453.5" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.92"/>
<rect x="1477.0" y="326" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.85"/>
<rect x="1524.0" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.82"/>
<rect x="1547.5" y="326" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1594.5" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1618.0" y="326" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1430.0" y="344" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1453.5" y="344" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1477.0" y="344" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="344" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="344" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1547.5" y="344" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.90"/>
<rect x="1571.0" y="344" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="344" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.76"/>
<rect x="1618.0" y="344" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1453.5" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1477.0" y="362" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.78"/>
<rect x="1524.0" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.79"/>
<rect x="1547.5" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1571.0" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1594.5" y="362" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1618.0" y="362" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="380" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.78"/>
<rect x="1477.0" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1500.5" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1524.0" y="380" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="380" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1594.5" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.95"/>
<rect x="1618.0" y="380" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1430.0" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.89"/>
<rect x="1453.5" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1477.0" y="398" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1500.5" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1524.0" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.91"/>
<rect x="1547.5" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.84"/>
<rect x="1571.0" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.95"/>
<rect x="1594.5" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.80"/>
<rect x="1618.0" y="398" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.90"/>
<rect x="1430.0" y="416" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.83"/>
<rect x="1453.5" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="416" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1500.5" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="416" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1571.0" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1618.0" y="416" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.96"/>
<rect x="1453.5" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.93"/>
<rect x="1477.0" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.94"/>
<rect x="1500.5" y="434" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="434" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="434" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1571.0" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.87"/>
<rect x="1594.5" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1618.0" y="434" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.92"/>
<rect x="1430.0" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1453.5" y="452" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.95"/>
<rect x="1500.5" y="452" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.85"/>
<rect x="1547.5" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.85"/>
<rect x="1571.0" y="452" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1594.5" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.89"/>
<rect x="1618.0" y="452" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1430.0" y="470" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1453.5" y="470" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="470" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1500.5" y="470" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1524.0" y="470" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1547.5" y="470" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.78"/>
<rect x="1571.0" y="470" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.97"/>
<rect x="1594.5" y="470" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.88"/>
<rect x="1618.0" y="470" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1430.0" y="488" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1453.5" y="488" width="17" height="11" rx="1" fill="#1b2440" opacity="0.90"/>
<rect x="1477.0" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.82"/>
<rect x="1500.5" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1524.0" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.86"/>
<rect x="1547.5" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1571.0" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.98"/>
<rect x="1594.5" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.77"/>
<rect x="1618.0" y="488" width="17" height="11" rx="1" fill="url(#warm)" opacity="0.81"/>
<rect x="1648" y="114" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="116" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="118" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="132" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="134" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="136" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="150" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="152" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="154" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="168" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="170" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="172" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="186" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="188" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="190" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="204" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="206" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="208" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="222" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="224" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="226" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="240" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="242" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="244" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="258" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="260" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="262" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="276" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="278" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="280" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="294" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="296" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="298" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="312" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="314" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="316" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="330" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="332" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="334" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="348" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="350" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="352" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="366" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="368" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="370" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="384" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="386" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="388" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="402" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="404" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1700" y="406" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="420" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="422" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="424" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1648" y="438" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="440" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="442" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="456" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1674" y="458" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="460" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="474" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="476" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="478" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1648" y="492" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1674" y="494" width="18" height="10" fill="#151c33" opacity="0.9"/>
<rect x="1700" y="496" width="18" height="10" fill="#e9a94f" opacity="0.55"/>
<rect x="1250" y="300" width="190" height="220" fill="url(#towerFace)"/>
<rect x="1260.0" y="316" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1285.5" y="316" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="316" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1336.5" y="316" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="316" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="316" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="316" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1260.0" y="334" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1285.5" y="334" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1311.0" y="334" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="334" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1362.0" y="334" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="334" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1413.0" y="334" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1260.0" y="352" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1285.5" y="352" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="352" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="352" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="352" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1387.5" y="352" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1413.0" y="352" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="370" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="370" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="370" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1336.5" y="370" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="370" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="370" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="370" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="388" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1336.5" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1362.0" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1413.0" y="388" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="406" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="406" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1311.0" y="406" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="406" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="406" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="406" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="406" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="424" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1285.5" y="424" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="424" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="424" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1362.0" y="424" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1387.5" y="424" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="424" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="442" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="442" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1311.0" y="442" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1336.5" y="442" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="442" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1387.5" y="442" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="442" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="460" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="460" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1311.0" y="460" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="460" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="460" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1387.5" y="460" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="460" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="478" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1285.5" y="478" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1311.0" y="478" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1336.5" y="478" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="478" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1387.5" y="478" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1413.0" y="478" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1260.0" y="496" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1285.5" y="496" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1311.0" y="496" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1336.5" y="496" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1362.0" y="496" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1387.5" y="496" width="19" height="11" rx="1" fill="url(#warm)" opacity="0.9"/>
<rect x="1413.0" y="496" width="19" height="11" rx="1" fill="#1b2440" opacity="0.85"/>
<rect x="1250" y="294" width="190" height="7" fill="#c7d0e0" opacity=".5"/>
<rect x="1440" y="470" width="180" height="50" fill="url(#lobby)"/>
<rect x="1440" y="466" width="180" height="4" fill="#d9e1ee" opacity=".7"/>
<line x1="1560" y1="70" x2="1560" y2="28" stroke="#9aa6bd" stroke-width="2"/>
<circle class="beacon" cx="1560" cy="26" r="3.5" fill="#ff5a6e"/>
<rect x="1760" y="200" width="160" height="320" fill="#141b33"/>
<rect x="1818" y="214" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="214" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1890" y="214" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="232" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="250" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="250" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="250" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1890" y="250" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="268" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="286" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="286" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="286" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="304" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="322" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="322" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="322" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="340" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="340" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="340" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="340" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="358" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="376" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1890" y="376" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1890" y="394" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="412" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="412" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1890" y="430" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1770" y="448" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="448" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="448" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1794" y="466" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="466" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="466" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1818" y="484" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1842" y="484" width="15" height="10" fill="#e3a14a" opacity=".55"/>
<rect x="1866" y="484" width="15" height="10" fill="#e3a14a" opacity=".55"/>
</g>
    <g class="home">
<rect x="640" y="400" width="430" height="120" fill="url(#homeWall)"/>
<rect x="660" y="415" width="250" height="90" fill="url(#warm)" opacity=".92"/>
<rect x="708.5" y="415" width="3" height="90" fill="#2a2f45"/>
<rect x="758.5" y="415" width="3" height="90" fill="#2a2f45"/>
<rect x="808.5" y="415" width="3" height="90" fill="#2a2f45"/>
<rect x="858.5" y="415" width="3" height="90" fill="#2a2f45"/>
<rect x="930" y="430" width="44" height="90" fill="#3a2a1c"/><rect x="934" y="434" width="36" height="86" fill="url(#door)"/>
<rect x="982" y="455" width="12" height="20" rx="2" fill="#1d2338" stroke="#9aa6bd" stroke-width=".8"/>
<rect class="panelglow" x="984.5" y="458" width="7" height="7" rx="1" fill="#39ff8f"/>
<rect x="1000" y="415" width="58" height="90" fill="url(#warm)" opacity=".75"/>
<rect x="700" y="318" width="470" height="82" fill="url(#homeUpper)"/>
<rect x="690" y="310" width="490" height="10" fill="#d7dbe3"/>
<rect x="720" y="332" width="300" height="56" fill="url(#warm)" opacity=".95"/>
<rect x="768.5" y="332" width="3" height="56" fill="#2a2f45"/>
<rect x="818.5" y="332" width="3" height="56" fill="#2a2f45"/>
<rect x="868.5" y="332" width="3" height="56" fill="#2a2f45"/>
<rect x="918.5" y="332" width="3" height="56" fill="#2a2f45"/>
<rect x="968.5" y="332" width="3" height="56" fill="#2a2f45"/>
<rect x="1040" y="332" width="110" height="56" fill="url(#warm2)" opacity=".85"/>
<rect x="1072" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1081" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1090" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1099" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1108" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1117" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1126" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1135" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1144" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1153" y="400" width="5" height="120" fill="#6b4a2e" opacity=".85"/>
<rect x="1170" y="370" width="90" height="150" fill="#2a3047"/>
<rect x="1182" y="390" width="66" height="80" fill="url(#warm2)" opacity=".7"/>
<rect x="610" y="520" width="520" height="16" fill="url(#pool)"/>
<rect x="660" y="522" width="250" height="10" fill="#f7c66b" opacity=".18"/>
<g transform="translate(690,322) scale(1.35,1.35)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g>
<g transform="translate(1168,322) scale(-1.35,1.35)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g>
<g transform="translate(1060,402) scale(-1.1,1.1)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g>
</g>
    <ellipse cx="600" cy="485.0" rx="22" ry="35.0" fill="#0c1426" opacity=".95"/>
<ellipse cx="1215" cy="490.0" rx="19" ry="30.0" fill="#0c1426" opacity=".95"/>
<ellipse cx="1395" cy="492.5" rx="18" ry="27.5" fill="#0c1426" opacity=".95"/>
<ellipse cx="1745" cy="487.5" rx="21" ry="32.5" fill="#0c1426" opacity=".95"/>
<ellipse cx="560" cy="495.0" rx="16" ry="25.0" fill="#0c1426" opacity=".95"/>
    <rect x="0" y="520" width="1920" height="80" fill="url(#ground)"/>
    <!-- walkway lights linking home to office -->
    <path d="M1130 536 C1250 530 1330 528 1440 522" stroke="#ffd58a" stroke-opacity=".35" stroke-width="2" fill="none"/>
    <circle cx="1160" cy="534" r="2.2" fill="#ffd58a" opacity=".8"/><circle cx="1210" cy="532" r="2.2" fill="#ffd58a" opacity=".8"/><circle cx="1260" cy="530" r="2.2" fill="#ffd58a" opacity=".8"/><circle cx="1310" cy="529" r="2.2" fill="#ffd58a" opacity=".8"/><circle cx="1360" cy="526" r="2.2" fill="#ffd58a" opacity=".8"/><circle cx="1410" cy="523" r="2.2" fill="#ffd58a" opacity=".8"/>
    <!-- office cameras / access -->
    <g transform="translate(1418,300) scale(-1,1)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g> <g transform="translate(1640,96) scale(0.9,0.9)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g> <g transform="translate(1440,466) scale(-0.85,0.85)" class="cam"><rect x="-2" y="-3" width="6" height="10" rx="1" fill="#8e99ad"/><rect x="0" y="-1" width="22" height="9" rx="4" fill="url(#metal)"/><rect x="20" y="0" width="3" height="7" rx="1" fill="#2a3350"/><circle class="led" cx="16" cy="3.5" r="1.4" fill="#39ff8f"/></g>
    <rect x="1626" y="482" width="11" height="18" rx="2" fill="#1d2338" stroke="#9aa6bd" stroke-width=".8"/>
    <rect class="panelglow" x="1628.5" y="485" width="6" height="6" rx="1" fill="#39ff8f"/>
  </g>

  <!-- data flow line: home -> office -->
  <path id="flowPath" d="M700 300 C900 200 1200 180 1420 92" stroke="#39ff8f" stroke-opacity=".18" stroke-width="1.5" fill="none" stroke-dasharray="4 8"/>
  <circle r="3" fill="#39ff8f" class="packet"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#flowPath"/></animateMotion></circle>
  <circle r="2.4" fill="#39ff8f" class="packet"><animateMotion dur="5s" begin="2.5s" repeatCount="indefinite"><mpath href="#flowPath"/></animateMotion></circle>

  <!-- left-third text shade -->
  <rect width="1920" height="600" fill="url(#textShade)"/>
</svg>
  <div class="hud" aria-hidden="true">
  <!-- camera feed panel 1 -->
  <div class="panel feed f1">
    <div class="ph"><span class="rec"></span><span class="lbl">LIVE · CAM 03 · FRONT ENTRY</span><span class="ts">21:47:09</span></div>
    <svg viewBox="0 0 200 110" class="feedimg">
      <rect width="200" height="110" fill="#0d1a2c"/>
      <rect x="20" y="40" width="90" height="55" fill="#1f3350"/><rect x="30" y="50" width="30" height="22" fill="#e8b866" opacity=".7"/>
      <rect x="70" y="55" width="22" height="40" fill="#3a2a1c"/><rect x="120" y="70" width="70" height="25" fill="#16263e"/>
      <rect x="0" y="95" width="200" height="15" fill="#0a1220"/>
      <rect class="bbox" x="128" y="48" width="24" height="44" fill="none" stroke="#39ff8f" stroke-width="1.2"/>
      <text x="128" y="45" fill="#39ff8f" font-size="7" font-family="monospace">PERSON 98%</text>
      <rect class="scan" x="0" y="0" width="200" height="3" fill="#39ff8f" opacity=".35"/>
    </svg>
  </div>
  <!-- camera feed panel 2 -->
  <div class="panel feed f2">
    <div class="ph"><span class="rec"></span><span class="lbl">LIVE · CAM 11 · LOBBY</span><span class="ts">21:47:09</span></div>
    <svg viewBox="0 0 200 110" class="feedimg">
      <rect width="200" height="110" fill="#101a2a"/>
      <rect x="0" y="0" width="200" height="70" fill="#1b2a44"/>
      <rect x="15" y="15" width="40" height="50" fill="#e8b866" opacity=".55"/><rect x="70" y="15" width="40" height="50" fill="#e8b866" opacity=".45"/><rect x="125" y="15" width="40" height="50" fill="#e8b866" opacity=".55"/>
      <rect x="0" y="70" width="200" height="40" fill="#0c1422"/>
      <rect x="85" y="60" width="30" height="14" fill="#2c3b57"/>
      <rect class="scan" x="0" y="0" width="200" height="3" fill="#39ff8f" opacity=".35"/>
    </svg>
  </div>
  <!-- status ring -->
  <div class="panel status">
    <svg viewBox="0 0 120 120" class="ring">
      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(57,255,143,.15)" stroke-width="6"/>
      <circle class="arc" cx="60" cy="60" r="50" fill="none" stroke="#39ff8f" stroke-width="6" stroke-linecap="round" stroke-dasharray="80 234"/>
      <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(160,190,255,.25)" stroke-width="1" stroke-dasharray="2 4"/>
      <text x="60" y="56" text-anchor="middle" fill="#fff" font-size="15" font-weight="700" font-family="Roboto,Arial">ARMED</text>
      <text x="60" y="74" text-anchor="middle" fill="#39ff8f" font-size="9" font-family="monospace">24 / 24 ONLINE</text>
    </svg>
    <div class="metrics">
      <div><span class="dot"></span>Perimeter<b>SECURE</b></div>
      <div><span class="dot"></span>Doors<b>LOCKED</b></div>
      <div><span class="dot"></span>Cloud sync<b>LIVE</b></div>
    </div>
  </div>
  <!-- access log -->
  <div class="panel log">
    <div class="ph"><span class="lbl">ACCESS LOG</span><span class="ts">REAL-TIME</span></div>
    <div class="logwin"><div class="loglines">
      <div><i class="ok"></i>21:46:58 · Main Gate · Badge #4471 · <b>GRANTED</b></div>
      <div><i class="ok"></i>21:46:31 · Lobby · Face ID · <b>GRANTED</b></div>
      <div><i class="warn"></i>21:45:12 · Dock B · Motion · <b>VERIFIED</b></div>
      <div><i class="ok"></i>21:44:47 · Front Door · Mobile key · <b>GRANTED</b></div>
      <div><i class="ok"></i>21:43:20 · Garage · PIN · <b>GRANTED</b></div>
      <div><i class="ok"></i>21:42:05 · Server Rm · Biometric · <b>GRANTED</b></div>
      <div><i class="ok"></i>21:46:58 · Main Gate · Badge #4471 · <b>GRANTED</b></div>
      <div><i class="ok"></i>21:46:31 · Lobby · Face ID · <b>GRANTED</b></div>
      <div><i class="warn"></i>21:45:12 · Dock B · Motion · <b>VERIFIED</b></div>
    </div></div>
  </div>
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
.drv-hero { position: relative; width: 100%; aspect-ratio: 1920 / 600; min-height: 420px; max-height: 640px; overflow: hidden; background: #070c22; color: #fff; font-family: Roboto, 'Helvetica Neue', Arial, sans-serif; isolation: isolate; }
.drv-hero .scene { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
.drv-hero .star { animation: twinkle 4s ease-in-out infinite; }
.drv-hero .led, .drv-hero .panelglow { animation: blink 2.4s ease-in-out infinite; filter: drop-shadow(0 0 3px #39ff8f); }
.drv-hero .beacon { animation: blink 1.6s steps(2) infinite; }
.drv-hero .packet { filter: drop-shadow(0 0 4px #39ff8f); }

.drv-hero .copy { position: absolute; z-index: 3; left: clamp(20px, 5vw, 96px); top: 50%; transform: translateY(-50%); max-width: min(560px, 42%); }
.drv-hero .eyebrow { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem .8rem; border: 1px solid rgba(57,255,143,.45); border-radius: 999px; color: #39ff8f; font: 600 .78rem/1 monospace; letter-spacing: .12em; text-transform: uppercase; background: rgba(57,255,143,.08); }
.drv-hero .eyebrow .pulse { width: 7px; height: 7px; border-radius: 50%; background: #39ff8f; animation: pulse 1.8s ease-out infinite; }
.drv-hero h1 { margin: 1rem 0 .75rem; font-size: clamp(2.1rem, 3.6vw, 4rem); line-height: 1.05; font-weight: 800; letter-spacing: -.02em; text-shadow: 0 4px 30px rgba(0,0,0,.5); }
.drv-hero h1 span { background: linear-gradient(90deg, #fff, #9fffc9); -webkit-background-clip: text; background-clip: text; color: transparent; }
.drv-hero p { margin: 0 0 1.6rem; font-size: clamp(1rem, 1.2vw, 1.25rem); line-height: 1.55; color: rgba(255,255,255,.82); max-width: 32ch; }
.drv-hero .actions { display: flex; gap: .8rem; flex-wrap: wrap; }
.drv-hero .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .85rem 1.5rem; border-radius: 999px; font-weight: 600; text-decoration: none; font-size: 1rem; transition: transform .2s, box-shadow .2s, background .2s; }
.drv-hero .btn.primary { background: #2ecc71; color: #fff; box-shadow: 0 8px 30px rgba(46,204,113,.35); }
.drv-hero .btn.primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(46,204,113,.5); }
.drv-hero .btn.ghost { color: #fff; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.06); backdrop-filter: blur(6px); }
.drv-hero .btn.ghost:hover { background: rgba(255,255,255,.14); }

.drv-hero .hud { position: absolute; inset: 0; z-index: 2; pointer-events: none; perspective: 1400px; }
.drv-hero .panel { position: absolute; background: linear-gradient(160deg, rgba(20,40,80,.55), rgba(10,18,40,.45)); border: 1px solid rgba(120,200,255,.35); border-radius: 10px; box-shadow: 0 0 0 1px rgba(57,255,143,.08) inset, 0 20px 50px rgba(0,0,0,.35), 0 0 24px rgba(80,160,255,.18); backdrop-filter: blur(4px) saturate(130%); -webkit-backdrop-filter: blur(4px) saturate(130%); font-family: 'Roboto Mono', monospace; color: #cfe3ff; animation: float 7s ease-in-out infinite; transform-style: preserve-3d; }
.drv-hero .panel::before { content: ''; position: absolute; inset: -1px; border-radius: 10px; padding: 1px; background: linear-gradient(120deg, rgba(57,255,143,.7), transparent 30%, transparent 70%, rgba(120,200,255,.6)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: .7; }
.drv-hero .ph { display: flex; align-items: center; gap: .45rem; padding: .45rem .65rem; font-size: .64rem; letter-spacing: .08em; color: #e6f0ff; border-bottom: 1px solid rgba(120,200,255,.2); }
.drv-hero .ph .lbl { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.drv-hero .ph .ts { flex: none; margin-left: auto; color: #39ff8f; }
.drv-hero .rec { width: 7px; height: 7px; border-radius: 50%; background: #ff4d5e; box-shadow: 0 0 6px #ff4d5e; animation: blink 1.2s steps(2) infinite; }
.drv-hero .feedimg { display: block; width: 100%; height: auto; border-radius: 0 0 9px 9px; }
.drv-hero .scan { animation: scan 3.2s linear infinite; }
.drv-hero .bbox { animation: blink 2s ease-in-out infinite; }

.drv-hero .f1 { right: 30.5%; top: 9%; width: 15.5%; transform: rotateY(-14deg) rotateX(4deg); }
.drv-hero .f2 { right: 12.5%; top: 47%; width: 14%; transform: rotateY(-18deg) rotateX(3deg); animation-delay: -2s; }
.drv-hero .status { right: 2.2%; top: 8%; width: 12.5%; padding: .8rem; display: flex; flex-direction: column; align-items: center; transform: rotateY(-22deg); animation-delay: -4s; }
.drv-hero .ring { width: 72%; }
.drv-hero .arc { transform-origin: 60px 60px; animation: spin 3.5s linear infinite; filter: drop-shadow(0 0 4px #39ff8f); }
.drv-hero .metrics { width: 100%; margin-top: .6rem; font-size: .62rem; display: grid; gap: .3rem; }
.drv-hero .metrics div { display: flex; align-items: center; gap: .4rem; }
.drv-hero .metrics b { margin-left: auto; color: #39ff8f; font-weight: 600; }
.drv-hero .dot { width: 6px; height: 6px; border-radius: 50%; background: #39ff8f; box-shadow: 0 0 6px #39ff8f; }
.drv-hero .log { right: 30%; bottom: 7%; width: 19%; transform: rotateY(-10deg) rotateX(6deg); animation-delay: -3s; }
.drv-hero .logwin { height: 74px; overflow: hidden; padding: .35rem .65rem .5rem; mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); -webkit-mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); }
.drv-hero .loglines { font-size: .6rem; line-height: 1.9; white-space: nowrap; animation: logscroll 9s linear infinite; }
.drv-hero .loglines b { color: #39ff8f; font-weight: 600; }
.drv-hero .loglines i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: .4rem; background: #39ff8f; }
.drv-hero .loglines i.warn { background: #ffc857; }

@keyframes twinkle { 0%,100% { opacity: .25 } 50% { opacity: .95 } }
@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: .25 } }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(57,255,143,.7) } 100% { box-shadow: 0 0 0 10px rgba(57,255,143,0) } }
@keyframes scan { from { transform: translateY(0) } to { transform: translateY(107px) } }
@keyframes spin { to { transform: rotate(360deg) } }
@keyframes logscroll { from { transform: translateY(0) } to { transform: translateY(-50%) } }
@keyframes float { 0%,100% { translate: 0 0 } 50% { translate: 0 -8px } }

@media (max-width: 1100px) {
  .drv-hero .f1, .drv-hero .log { display: none; }
  .drv-hero .f2 { right: 4%; top: auto; bottom: 8%; width: 26%; }
  .drv-hero .status { width: 20%; }
  .drv-hero .copy { max-width: 60%; }
}
@media (max-width: 700px) {
  .drv-hero { aspect-ratio: auto; min-height: 520px; }
  .drv-hero::after { content: ''; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(5,9,22,.9) 0%, rgba(5,9,22,.78) 55%, rgba(5,9,22,.35) 100%); }
  .drv-hero .hud { display: none; }
  .drv-hero .copy { max-width: none; right: 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .drv-hero *, .drv-hero *::before { animation: none !important; }
}

  `],
})
export class HeroBanner {
  protected readonly assessmentHref = ASSESSMENT_HREF;
}
