/**
 * Animated page banners: per-photo overlay maps + per-page copy.
 *
 * All overlay coordinates are in each photo's own 1536x1024 pixel space, so they stay
 * locked to the image at any screen size. To tune a glow or scan line, adjust its
 * x / y / w / h here. To add a page, add a HERO_PAGES entry keyed by its route.
 */
export interface HeroGlow { x: number; y: number; w: number; h: number; rx: number; color: string; dur: number; soft: boolean; frame: boolean; }
export interface HeroScan { x: number; y: number; w: number; h: number; band: number; dur: number; }
export interface HeroDot { x: number; y: number; color: string; rec: boolean; }
export interface HeroRing { cx: number; cy: number; r: number; dur: number; reverse: boolean; dash: string; }
export interface HeroTrace { d: string; dur: number; }
export interface HeroParticle { x: number; y: number; r: number; c: string; dur: number; delay: number; }
export interface HeroScene {
  img: string;
  viewBox: string;        // visible crop of the photo
  align: string;          // SVG preserveAspectRatio alignment (used with "slice")
  fade: boolean;          // fade the photo's left edge (used when the photo is shifted right)
  glows: HeroGlow[];
  scans: HeroScan[];
  dots: HeroDot[];
  rings: HeroRing[];
  traces: HeroTrace[];
  particles: HeroParticle[];
  sweep: { y: number; h: number };
}
export interface HeroPage {
  scene: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  text: string;
  chip: string;
  secondary: { label: string; route: string; audience?: string };
}

export const HERO_SCENES: Record<string, HeroScene> = {
  "landing": {
    "img": "/assets/backgrounds/landing-Bnr.webp",
    "viewBox": "0 180 1536 680",
    "align": "xMidYMax",
    "fade": false,
    "glows": [
      {
        "x": 584,
        "y": 564,
        "w": 190,
        "h": 234,
        "rx": 12,
        "color": "#38c8ff",
        "dur": 3.6,
        "soft": false,
        "frame": true
      },
      {
        "x": 876,
        "y": 636,
        "w": 222,
        "h": 144,
        "rx": 12,
        "color": "#ff9a3c",
        "dur": 2.2,
        "soft": false,
        "frame": false
      }
    ],
    "scans": [
      {
        "x": 42,
        "y": 582,
        "w": 212,
        "h": 122,
        "band": 39,
        "dur": 3.4
      },
      {
        "x": 1124,
        "y": 574,
        "w": 316,
        "h": 160,
        "band": 51,
        "dur": 4.2
      }
    ],
    "dots": [
      {
        "x": 246,
        "y": 560,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1430,
        "y": 560,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1336,
        "y": 214,
        "color": "#39ff8f",
        "rec": false
      }
    ],
    "rings": [],
    "traces": [
      {
        "d": "M266 735 L420 735 L470 760 L584 760",
        "dur": 4.5
      },
      {
        "d": "M774 690 L830 690 L860 712 L876 712",
        "dur": 3.2
      },
      {
        "d": "M1098 700 L1124 690",
        "dur": 2.2
      },
      {
        "d": "M300 805 L520 805 L560 830 L760 830 L800 805 L1000 805",
        "dur": 6
      },
      {
        "d": "M600 800 L640 845 L900 845 L960 820 L1180 820",
        "dur": 5.2
      }
    ],
    "particles": [
      {
        "x": 1343,
        "y": 681,
        "r": 3.7,
        "c": "#ffd58a",
        "dur": 11.5,
        "delay": 1.8
      },
      {
        "x": 1101,
        "y": 749,
        "r": 4.0,
        "c": "#7fd7ff",
        "dur": 9.9,
        "delay": 4.7
      },
      {
        "x": 577,
        "y": 921,
        "r": 4.1,
        "c": "#ffd58a",
        "dur": 12.9,
        "delay": 2.8
      },
      {
        "x": 667,
        "y": 843,
        "r": 4.4,
        "c": "#9ff5ff",
        "dur": 14.7,
        "delay": 5.6
      },
      {
        "x": 861,
        "y": 975,
        "r": 3.6,
        "c": "#7fd7ff",
        "dur": 12.4,
        "delay": 2.8
      },
      {
        "x": 302,
        "y": 914,
        "r": 2.1,
        "c": "#7fd7ff",
        "dur": 10.1,
        "delay": 9.2
      },
      {
        "x": 314,
        "y": 699,
        "r": 1.7,
        "c": "#7fd7ff",
        "dur": 12.7,
        "delay": 9.4
      },
      {
        "x": 1476,
        "y": 870,
        "r": 2.7,
        "c": "#9ff5ff",
        "dur": 13.5,
        "delay": 3.0
      },
      {
        "x": 593,
        "y": 740,
        "r": 1.9,
        "c": "#ffd58a",
        "dur": 8.7,
        "delay": 5.9
      },
      {
        "x": 537,
        "y": 931,
        "r": 3.0,
        "c": "#7fffc2",
        "dur": 15.6,
        "delay": 3.0
      },
      {
        "x": 594,
        "y": 879,
        "r": 2.2,
        "c": "#ffd58a",
        "dur": 8.2,
        "delay": 5.4
      },
      {
        "x": 1117,
        "y": 649,
        "r": 2.8,
        "c": "#9ff5ff",
        "dur": 10.6,
        "delay": 0.8
      },
      {
        "x": 981,
        "y": 851,
        "r": 3.3,
        "c": "#9ff5ff",
        "dur": 8.4,
        "delay": 9.6
      },
      {
        "x": 1035,
        "y": 890,
        "r": 2.2,
        "c": "#7fd7ff",
        "dur": 14.4,
        "delay": 10.0
      },
      {
        "x": 608,
        "y": 821,
        "r": 3.0,
        "c": "#ffd58a",
        "dur": 15.0,
        "delay": 2.7
      },
      {
        "x": 1343,
        "y": 723,
        "r": 2.4,
        "c": "#7fffc2",
        "dur": 8.4,
        "delay": 1.1
      },
      {
        "x": 601,
        "y": 939,
        "r": 2.6,
        "c": "#ffd58a",
        "dur": 8.1,
        "delay": 0.1
      },
      {
        "x": 1305,
        "y": 876,
        "r": 3.4,
        "c": "#9ff5ff",
        "dur": 10.1,
        "delay": 3.9
      },
      {
        "x": 740,
        "y": 922,
        "r": 1.5,
        "c": "#9ff5ff",
        "dur": 13.9,
        "delay": 0.1
      },
      {
        "x": 829,
        "y": 909,
        "r": 1.7,
        "c": "#ffd58a",
        "dur": 10.2,
        "delay": 7.5
      },
      {
        "x": 200,
        "y": 640,
        "r": 3.7,
        "c": "#7fd7ff",
        "dur": 14.1,
        "delay": 1.1
      },
      {
        "x": 910,
        "y": 951,
        "r": 2.3,
        "c": "#7fd7ff",
        "dur": 12.7,
        "delay": 1.1
      },
      {
        "x": 964,
        "y": 879,
        "r": 4.2,
        "c": "#ffd58a",
        "dur": 11.7,
        "delay": 2.8
      },
      {
        "x": 243,
        "y": 727,
        "r": 3.2,
        "c": "#7fffc2",
        "dur": 8.0,
        "delay": 4.4
      },
      {
        "x": 826,
        "y": 716,
        "r": 3.6,
        "c": "#9ff5ff",
        "dur": 8.9,
        "delay": 9.4
      },
      {
        "x": 1186,
        "y": 943,
        "r": 4.2,
        "c": "#7fffc2",
        "dur": 13.9,
        "delay": 3.8
      },
      {
        "x": 1142,
        "y": 791,
        "r": 4.5,
        "c": "#9ff5ff",
        "dur": 8.1,
        "delay": 3.7
      },
      {
        "x": 260,
        "y": 661,
        "r": 2.0,
        "c": "#7fffc2",
        "dur": 8.9,
        "delay": 0.3
      },
      {
        "x": 1190,
        "y": 950,
        "r": 3.9,
        "c": "#7fffc2",
        "dur": 14.3,
        "delay": 4.3
      },
      {
        "x": 850,
        "y": 862,
        "r": 2.3,
        "c": "#7fffc2",
        "dur": 12.4,
        "delay": 4.8
      },
      {
        "x": 450,
        "y": 672,
        "r": 3.4,
        "c": "#9ff5ff",
        "dur": 15.3,
        "delay": 7.0
      },
      {
        "x": 955,
        "y": 626,
        "r": 3.2,
        "c": "#7fffc2",
        "dur": 9.9,
        "delay": 8.0
      },
      {
        "x": 643,
        "y": 716,
        "r": 3.5,
        "c": "#9ff5ff",
        "dur": 12.9,
        "delay": 7.2
      },
      {
        "x": 1218,
        "y": 918,
        "r": 1.5,
        "c": "#ffd58a",
        "dur": 10.9,
        "delay": 5.1
      }
    ],
    "sweep": {
      "y": 520,
      "h": 360
    }
  },
  "home": {
    "img": "/assets/backgrounds/home-Bnr.webp",
    "viewBox": "0 310 1536 680",
    "align": "xMidYMax",
    "fade": false,
    "glows": [
      {
        "x": 606,
        "y": 546,
        "w": 184,
        "h": 248,
        "rx": 12,
        "color": "#38c8ff",
        "dur": 3.6,
        "soft": false,
        "frame": true
      },
      {
        "x": 884,
        "y": 636,
        "w": 212,
        "h": 120,
        "rx": 12,
        "color": "#ff9a3c",
        "dur": 2.2,
        "soft": false,
        "frame": false
      },
      {
        "x": 1356,
        "y": 548,
        "w": 70,
        "h": 80,
        "rx": 12,
        "color": "#39ff8f",
        "dur": 2.8,
        "soft": false,
        "frame": false
      }
    ],
    "scans": [
      {
        "x": 42,
        "y": 642,
        "w": 212,
        "h": 126,
        "band": 40,
        "dur": 3.4
      },
      {
        "x": 1120,
        "y": 560,
        "w": 170,
        "h": 142,
        "band": 45,
        "dur": 4.2
      }
    ],
    "dots": [
      {
        "x": 246,
        "y": 626,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1282,
        "y": 548,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1418,
        "y": 196,
        "color": "#39ff8f",
        "rec": false
      }
    ],
    "rings": [],
    "traces": [
      {
        "d": "M258 760 L420 760 L470 785 L606 785",
        "dur": 4.5
      },
      {
        "d": "M790 680 L840 680 L870 700 L884 700",
        "dur": 3.2
      },
      {
        "d": "M1096 690 L1120 680",
        "dur": 2.2
      },
      {
        "d": "M300 880 L520 880 L560 905 L760 905 L800 880 L1000 880",
        "dur": 6
      }
    ],
    "particles": [
      {
        "x": 915,
        "y": 912,
        "r": 1.9,
        "c": "#ffd58a",
        "dur": 14.7,
        "delay": 3.1
      },
      {
        "x": 838,
        "y": 779,
        "r": 3.7,
        "c": "#7fffc2",
        "dur": 14.2,
        "delay": 6.3
      },
      {
        "x": 609,
        "y": 899,
        "r": 1.7,
        "c": "#7fffc2",
        "dur": 9.8,
        "delay": 4.8
      },
      {
        "x": 391,
        "y": 991,
        "r": 2.6,
        "c": "#ffd58a",
        "dur": 10.4,
        "delay": 1.0
      },
      {
        "x": 1266,
        "y": 956,
        "r": 3.8,
        "c": "#9ff5ff",
        "dur": 10.8,
        "delay": 5.5
      },
      {
        "x": 1312,
        "y": 960,
        "r": 1.6,
        "c": "#7fffc2",
        "dur": 11.3,
        "delay": 4.2
      },
      {
        "x": 238,
        "y": 942,
        "r": 2.5,
        "c": "#9ff5ff",
        "dur": 14.6,
        "delay": 2.5
      },
      {
        "x": 455,
        "y": 882,
        "r": 2.5,
        "c": "#7fffc2",
        "dur": 8.4,
        "delay": 8.3
      },
      {
        "x": 802,
        "y": 732,
        "r": 2.1,
        "c": "#7fffc2",
        "dur": 15.7,
        "delay": 0.9
      },
      {
        "x": 1297,
        "y": 886,
        "r": 2.9,
        "c": "#7fffc2",
        "dur": 9.9,
        "delay": 7.3
      },
      {
        "x": 162,
        "y": 700,
        "r": 2.7,
        "c": "#ffd58a",
        "dur": 8.3,
        "delay": 2.0
      },
      {
        "x": 1385,
        "y": 950,
        "r": 2.1,
        "c": "#7fffc2",
        "dur": 14.8,
        "delay": 4.8
      },
      {
        "x": 1309,
        "y": 983,
        "r": 2.4,
        "c": "#7fffc2",
        "dur": 10.1,
        "delay": 2.3
      },
      {
        "x": 286,
        "y": 958,
        "r": 1.6,
        "c": "#ffd58a",
        "dur": 15.1,
        "delay": 3.7
      },
      {
        "x": 1371,
        "y": 713,
        "r": 2.4,
        "c": "#7fd7ff",
        "dur": 10.6,
        "delay": 8.7
      },
      {
        "x": 1216,
        "y": 760,
        "r": 3.2,
        "c": "#9ff5ff",
        "dur": 14.3,
        "delay": 8.3
      },
      {
        "x": 1396,
        "y": 719,
        "r": 3.2,
        "c": "#9ff5ff",
        "dur": 14.2,
        "delay": 0.8
      },
      {
        "x": 977,
        "y": 737,
        "r": 2.9,
        "c": "#7fffc2",
        "dur": 13.8,
        "delay": 9.7
      },
      {
        "x": 889,
        "y": 748,
        "r": 3.1,
        "c": "#7fd7ff",
        "dur": 13.0,
        "delay": 0.1
      },
      {
        "x": 1035,
        "y": 836,
        "r": 2.6,
        "c": "#7fffc2",
        "dur": 14.5,
        "delay": 8.4
      },
      {
        "x": 942,
        "y": 963,
        "r": 3.4,
        "c": "#7fffc2",
        "dur": 9.1,
        "delay": 5.3
      },
      {
        "x": 854,
        "y": 884,
        "r": 2.7,
        "c": "#7fffc2",
        "dur": 10.6,
        "delay": 4.9
      },
      {
        "x": 1095,
        "y": 810,
        "r": 1.5,
        "c": "#ffd58a",
        "dur": 15.0,
        "delay": 9.3
      },
      {
        "x": 797,
        "y": 888,
        "r": 4.2,
        "c": "#7fffc2",
        "dur": 9.9,
        "delay": 3.1
      },
      {
        "x": 1379,
        "y": 911,
        "r": 3.1,
        "c": "#ffd58a",
        "dur": 14.9,
        "delay": 3.5
      },
      {
        "x": 1364,
        "y": 990,
        "r": 2.6,
        "c": "#ffd58a",
        "dur": 15.1,
        "delay": 3.4
      },
      {
        "x": 442,
        "y": 996,
        "r": 2.6,
        "c": "#ffd58a",
        "dur": 14.3,
        "delay": 7.1
      },
      {
        "x": 787,
        "y": 925,
        "r": 3.2,
        "c": "#ffd58a",
        "dur": 11.0,
        "delay": 0.7
      },
      {
        "x": 413,
        "y": 983,
        "r": 1.6,
        "c": "#7fffc2",
        "dur": 13.1,
        "delay": 6.0
      },
      {
        "x": 692,
        "y": 852,
        "r": 2.1,
        "c": "#ffd58a",
        "dur": 8.7,
        "delay": 3.4
      }
    ],
    "sweep": {
      "y": 540,
      "h": 420
    }
  },
  "install": {
    "img": "/assets/backgrounds/install-Bnr.webp",
    "viewBox": "0 170 1536 680",
    "align": "xMidYMin",
    "fade": false,
    "glows": [
      {
        "x": 960,
        "y": 230,
        "w": 180,
        "h": 180,
        "rx": 90,
        "color": "#ffb347",
        "dur": 3.2,
        "soft": false,
        "frame": false
      },
      {
        "x": 215,
        "y": 657,
        "w": 1103,
        "h": 285,
        "rx": 10,
        "color": "#38c8ff",
        "dur": 4.5,
        "soft": true,
        "frame": false
      }
    ],
    "scans": [
      {
        "x": 235,
        "y": 715,
        "w": 493,
        "h": 205,
        "band": 66,
        "dur": 4.6
      },
      {
        "x": 777,
        "y": 715,
        "w": 495,
        "h": 205,
        "band": 66,
        "dur": 5.4
      }
    ],
    "dots": [
      {
        "x": 700,
        "y": 690,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1240,
        "y": 690,
        "color": "#ff4d5e",
        "rec": true
      },
      {
        "x": 1077,
        "y": 430,
        "color": "#38c8ff",
        "rec": false
      },
      {
        "x": 72,
        "y": 232,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 242,
        "y": 428,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 874,
        "y": 392,
        "color": "#39ff8f",
        "rec": false
      }
    ],
    "rings": [
      {
        "cx": 1045,
        "cy": 330,
        "r": 118,
        "dur": 6,
        "reverse": false,
        "dash": "163 578"
      }
    ],
    "traces": [
      {
        "d": "M0 490 L140 548 L235 600",
        "dur": 3.8
      },
      {
        "d": "M240 598 L720 522 L1000 560 L1400 603",
        "dur": 6.5
      },
      {
        "d": "M520 548 L720 522",
        "dur": 2.6
      },
      {
        "d": "M1318 660 L1536 640",
        "dur": 3
      }
    ],
    "particles": [
      {
        "x": 1384,
        "y": 675,
        "r": 1.8,
        "c": "#7fffc2",
        "dur": 14.2,
        "delay": 0.0
      },
      {
        "x": 878,
        "y": 990,
        "r": 2.6,
        "c": "#7fffc2",
        "dur": 13.3,
        "delay": 8.7
      },
      {
        "x": 611,
        "y": 704,
        "r": 1.7,
        "c": "#ffd58a",
        "dur": 15.9,
        "delay": 9.7
      },
      {
        "x": 1084,
        "y": 869,
        "r": 2.2,
        "c": "#7fd7ff",
        "dur": 11.9,
        "delay": 0.7
      },
      {
        "x": 1487,
        "y": 869,
        "r": 3.4,
        "c": "#ffd58a",
        "dur": 8.3,
        "delay": 9.3
      },
      {
        "x": 459,
        "y": 650,
        "r": 3.1,
        "c": "#7fffc2",
        "dur": 13.2,
        "delay": 8.7
      },
      {
        "x": 1313,
        "y": 906,
        "r": 3.2,
        "c": "#9ff5ff",
        "dur": 11.8,
        "delay": 0.6
      },
      {
        "x": 997,
        "y": 579,
        "r": 3.1,
        "c": "#7fffc2",
        "dur": 9.4,
        "delay": 4.3
      },
      {
        "x": 757,
        "y": 774,
        "r": 2.4,
        "c": "#9ff5ff",
        "dur": 13.4,
        "delay": 2.1
      },
      {
        "x": 396,
        "y": 803,
        "r": 3.1,
        "c": "#9ff5ff",
        "dur": 10.0,
        "delay": 8.7
      },
      {
        "x": 415,
        "y": 955,
        "r": 3.7,
        "c": "#9ff5ff",
        "dur": 14.8,
        "delay": 3.1
      },
      {
        "x": 367,
        "y": 770,
        "r": 3.8,
        "c": "#9ff5ff",
        "dur": 10.4,
        "delay": 2.9
      },
      {
        "x": 1351,
        "y": 642,
        "r": 1.8,
        "c": "#7fffc2",
        "dur": 13.3,
        "delay": 3.1
      },
      {
        "x": 1358,
        "y": 650,
        "r": 4.2,
        "c": "#ffd58a",
        "dur": 9.5,
        "delay": 5.2
      },
      {
        "x": 967,
        "y": 868,
        "r": 2.4,
        "c": "#ffd58a",
        "dur": 13.5,
        "delay": 8.2
      },
      {
        "x": 586,
        "y": 754,
        "r": 3.3,
        "c": "#7fffc2",
        "dur": 12.5,
        "delay": 9.0
      },
      {
        "x": 986,
        "y": 758,
        "r": 3.1,
        "c": "#ffd58a",
        "dur": 9.9,
        "delay": 6.2
      },
      {
        "x": 563,
        "y": 776,
        "r": 3.9,
        "c": "#ffd58a",
        "dur": 10.9,
        "delay": 0.8
      },
      {
        "x": 1063,
        "y": 997,
        "r": 3.5,
        "c": "#7fd7ff",
        "dur": 8.1,
        "delay": 6.2
      },
      {
        "x": 1046,
        "y": 904,
        "r": 3.7,
        "c": "#9ff5ff",
        "dur": 11.2,
        "delay": 5.2
      },
      {
        "x": 614,
        "y": 663,
        "r": 4.1,
        "c": "#9ff5ff",
        "dur": 15.1,
        "delay": 8.2
      },
      {
        "x": 244,
        "y": 872,
        "r": 2.4,
        "c": "#ffd58a",
        "dur": 14.0,
        "delay": 2.2
      },
      {
        "x": 392,
        "y": 618,
        "r": 2.4,
        "c": "#9ff5ff",
        "dur": 8.1,
        "delay": 1.7
      },
      {
        "x": 473,
        "y": 827,
        "r": 3.5,
        "c": "#ffd58a",
        "dur": 13.6,
        "delay": 4.3
      },
      {
        "x": 1069,
        "y": 812,
        "r": 4.4,
        "c": "#9ff5ff",
        "dur": 8.6,
        "delay": 5.0
      },
      {
        "x": 1313,
        "y": 620,
        "r": 3.6,
        "c": "#7fd7ff",
        "dur": 13.1,
        "delay": 8.1
      },
      {
        "x": 1017,
        "y": 782,
        "r": 3.3,
        "c": "#9ff5ff",
        "dur": 9.2,
        "delay": 6.1
      },
      {
        "x": 1472,
        "y": 604,
        "r": 4.2,
        "c": "#9ff5ff",
        "dur": 11.1,
        "delay": 7.6
      },
      {
        "x": 693,
        "y": 628,
        "r": 1.5,
        "c": "#7fd7ff",
        "dur": 8.1,
        "delay": 3.0
      },
      {
        "x": 897,
        "y": 851,
        "r": 1.6,
        "c": "#7fffc2",
        "dur": 9.3,
        "delay": 6.9
      },
      {
        "x": 232,
        "y": 824,
        "r": 3.6,
        "c": "#ffd58a",
        "dur": 10.3,
        "delay": 8.7
      },
      {
        "x": 1302,
        "y": 835,
        "r": 4.0,
        "c": "#ffd58a",
        "dur": 13.2,
        "delay": 1.6
      },
      {
        "x": 1179,
        "y": 649,
        "r": 3.3,
        "c": "#7fd7ff",
        "dur": 11.1,
        "delay": 5.1
      },
      {
        "x": 717,
        "y": 919,
        "r": 2.5,
        "c": "#7fd7ff",
        "dur": 8.7,
        "delay": 3.9
      }
    ],
    "sweep": {
      "y": 650,
      "h": 300
    }
  },
  "access": {
    "img": "/assets/backgrounds/access-Bnr.webp",
    "viewBox": "-240 180 1776 680",
    "align": "xMinYMax",
    "fade": true,
    "glows": [
      {
        "x": 553,
        "y": 340,
        "w": 112,
        "h": 157,
        "rx": 6,
        "color": "#39ff8f",
        "dur": 2.6,
        "soft": false,
        "frame": true
      },
      {
        "x": 863,
        "y": 242,
        "w": 354,
        "h": 92,
        "rx": 18,
        "color": "#38c8ff",
        "dur": 3.4,
        "soft": false,
        "frame": false
      },
      {
        "x": 898,
        "y": 417,
        "w": 362,
        "h": 188,
        "rx": 12,
        "color": "#38c8ff",
        "dur": 4.4,
        "soft": true,
        "frame": false
      },
      {
        "x": 882,
        "y": 628,
        "w": 403,
        "h": 145,
        "rx": 12,
        "color": "#38c8ff",
        "dur": 5,
        "soft": true,
        "frame": false
      }
    ],
    "scans": [
      {
        "x": 553,
        "y": 340,
        "w": 112,
        "h": 157,
        "band": 50,
        "dur": 3
      },
      {
        "x": 882,
        "y": 660,
        "w": 403,
        "h": 110,
        "band": 35,
        "dur": 4.4
      }
    ],
    "dots": [
      {
        "x": 1257,
        "y": 686,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 1257,
        "y": 730,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 1356,
        "y": 375,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 1333,
        "y": 375,
        "color": "#ff9a3c",
        "rec": false
      },
      {
        "x": 1418,
        "y": 112,
        "color": "#ff4d5e",
        "rec": true
      }
    ],
    "rings": [],
    "traces": [
      {
        "d": "M665 385 L700 385 L1300 388",
        "dur": 5
      },
      {
        "d": "M700 540 L790 540 L880 520",
        "dur": 3
      },
      {
        "d": "M690 700 L800 690 L882 690",
        "dur": 3.2
      },
      {
        "d": "M130 750 L330 700 L450 690",
        "dur": 4.2
      },
      {
        "d": "M1300 400 L1300 780 L1500 790",
        "dur": 5.5
      }
    ],
    "particles": [
      {
        "x": 621,
        "y": 729,
        "r": 4.1,
        "c": "#7fffc2",
        "dur": 10.7,
        "delay": 5.7
      },
      {
        "x": 371,
        "y": 832,
        "r": 2.6,
        "c": "#7fd7ff",
        "dur": 12.9,
        "delay": 1.2
      },
      {
        "x": 785,
        "y": 996,
        "r": 1.7,
        "c": "#7fd7ff",
        "dur": 8.1,
        "delay": 7.6
      },
      {
        "x": 315,
        "y": 987,
        "r": 2.4,
        "c": "#ffd58a",
        "dur": 8.5,
        "delay": 4.8
      },
      {
        "x": 540,
        "y": 623,
        "r": 3.7,
        "c": "#7fffc2",
        "dur": 9.7,
        "delay": 7.9
      },
      {
        "x": 1081,
        "y": 774,
        "r": 3.0,
        "c": "#7fd7ff",
        "dur": 13.3,
        "delay": 0.3
      },
      {
        "x": 355,
        "y": 771,
        "r": 3.9,
        "c": "#7fd7ff",
        "dur": 8.4,
        "delay": 9.0
      },
      {
        "x": 1449,
        "y": 946,
        "r": 3.9,
        "c": "#7fd7ff",
        "dur": 10.5,
        "delay": 3.3
      },
      {
        "x": 1366,
        "y": 912,
        "r": 4.4,
        "c": "#9ff5ff",
        "dur": 11.4,
        "delay": 2.6
      },
      {
        "x": 1105,
        "y": 972,
        "r": 2.5,
        "c": "#7fd7ff",
        "dur": 15.0,
        "delay": 7.6
      },
      {
        "x": 141,
        "y": 682,
        "r": 3.0,
        "c": "#9ff5ff",
        "dur": 8.4,
        "delay": 0.6
      },
      {
        "x": 492,
        "y": 647,
        "r": 2.1,
        "c": "#7fd7ff",
        "dur": 8.5,
        "delay": 0.9
      },
      {
        "x": 1421,
        "y": 728,
        "r": 2.3,
        "c": "#ffd58a",
        "dur": 10.1,
        "delay": 4.5
      },
      {
        "x": 1318,
        "y": 692,
        "r": 2.8,
        "c": "#7fffc2",
        "dur": 13.4,
        "delay": 9.2
      },
      {
        "x": 577,
        "y": 940,
        "r": 1.7,
        "c": "#7fd7ff",
        "dur": 13.8,
        "delay": 6.0
      },
      {
        "x": 935,
        "y": 806,
        "r": 4.3,
        "c": "#9ff5ff",
        "dur": 12.1,
        "delay": 0.3
      },
      {
        "x": 360,
        "y": 655,
        "r": 2.4,
        "c": "#ffd58a",
        "dur": 14.6,
        "delay": 8.1
      },
      {
        "x": 1359,
        "y": 937,
        "r": 4.3,
        "c": "#9ff5ff",
        "dur": 13.4,
        "delay": 9.1
      },
      {
        "x": 974,
        "y": 634,
        "r": 1.7,
        "c": "#9ff5ff",
        "dur": 9.9,
        "delay": 4.7
      },
      {
        "x": 474,
        "y": 939,
        "r": 2.1,
        "c": "#ffd58a",
        "dur": 14.4,
        "delay": 4.8
      },
      {
        "x": 917,
        "y": 592,
        "r": 2.6,
        "c": "#7fd7ff",
        "dur": 11.1,
        "delay": 0.8
      },
      {
        "x": 1370,
        "y": 739,
        "r": 2.3,
        "c": "#ffd58a",
        "dur": 10.0,
        "delay": 8.0
      },
      {
        "x": 1340,
        "y": 599,
        "r": 1.6,
        "c": "#ffd58a",
        "dur": 11.9,
        "delay": 2.0
      },
      {
        "x": 925,
        "y": 664,
        "r": 2.5,
        "c": "#7fd7ff",
        "dur": 15.2,
        "delay": 8.0
      },
      {
        "x": 194,
        "y": 626,
        "r": 1.7,
        "c": "#7fd7ff",
        "dur": 13.4,
        "delay": 6.4
      },
      {
        "x": 238,
        "y": 897,
        "r": 1.8,
        "c": "#7fd7ff",
        "dur": 15.6,
        "delay": 5.2
      },
      {
        "x": 1493,
        "y": 764,
        "r": 2.8,
        "c": "#7fd7ff",
        "dur": 15.7,
        "delay": 8.2
      },
      {
        "x": 1141,
        "y": 708,
        "r": 4.1,
        "c": "#7fffc2",
        "dur": 11.7,
        "delay": 5.5
      },
      {
        "x": 1134,
        "y": 931,
        "r": 3.1,
        "c": "#7fffc2",
        "dur": 12.0,
        "delay": 7.2
      },
      {
        "x": 274,
        "y": 690,
        "r": 2.7,
        "c": "#7fffc2",
        "dur": 13.4,
        "delay": 6.9
      }
    ],
    "sweep": {
      "y": 230,
      "h": 560
    }
  },
  "surveil": {
    "img": "/assets/backgrounds/surveil-Bnr.webp",
    "viewBox": "0 150 1536 690",
    "align": "xMidYMax",
    "fade": false,
    "glows": [
      {
        "x": 680,
        "y": 150,
        "w": 250,
        "h": 132,
        "rx": 60,
        "color": "#38c8ff",
        "dur": 3.6,
        "soft": false,
        "frame": false
      },
      {
        "x": 1027,
        "y": 336,
        "w": 278,
        "h": 127,
        "rx": 10,
        "color": "#ff9a3c",
        "dur": 2.2,
        "soft": false,
        "frame": true
      },
      {
        "x": 458,
        "y": 532,
        "w": 660,
        "h": 290,
        "rx": 8,
        "color": "#38c8ff",
        "dur": 5,
        "soft": true,
        "frame": false
      }
    ],
    "scans": [
      {
        "x": 472,
        "y": 542,
        "w": 313,
        "h": 113,
        "band": 36,
        "dur": 3.4
      },
      {
        "x": 793,
        "y": 546,
        "w": 319,
        "h": 136,
        "band": 44,
        "dur": 4.1
      },
      {
        "x": 460,
        "y": 676,
        "w": 320,
        "h": 124,
        "band": 40,
        "dur": 3.8
      },
      {
        "x": 779,
        "y": 683,
        "w": 326,
        "h": 132,
        "band": 42,
        "dur": 4.6
      }
    ],
    "dots": [
      {
        "x": 513,
        "y": 513,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 140,
        "y": 158,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 362,
        "y": 306,
        "color": "#39ff8f",
        "rec": false
      },
      {
        "x": 1408,
        "y": 118,
        "color": "#ff4d5e",
        "rec": true
      }
    ],
    "rings": [
      {
        "cx": 942,
        "cy": 350,
        "r": 62,
        "dur": 3.5,
        "reverse": false,
        "dash": "86 304"
      },
      {
        "cx": 708,
        "cy": 350,
        "r": 46,
        "dur": 5,
        "reverse": true,
        "dash": "64 225"
      }
    ],
    "traces": [
      {
        "d": "M745 285 L745 495",
        "dur": 2.4
      },
      {
        "d": "M775 285 L775 495",
        "dur": 2.9
      },
      {
        "d": "M815 285 L815 495",
        "dur": 2.2
      },
      {
        "d": "M850 285 L850 495",
        "dur": 2.7
      },
      {
        "d": "M130 515 L300 505 L460 500",
        "dur": 3.6
      },
      {
        "d": "M1160 520 L1350 560 L1536 600",
        "dur": 4.2
      }
    ],
    "particles": [
      {
        "x": 513,
        "y": 432,
        "r": 3.4,
        "c": "#9ff5ff",
        "dur": 9.0,
        "delay": 6.4
      },
      {
        "x": 991,
        "y": 812,
        "r": 1.6,
        "c": "#7fffc2",
        "dur": 12.3,
        "delay": 3.6
      },
      {
        "x": 561,
        "y": 475,
        "r": 2.2,
        "c": "#7fd7ff",
        "dur": 12.7,
        "delay": 3.0
      },
      {
        "x": 900,
        "y": 456,
        "r": 2.5,
        "c": "#7fffc2",
        "dur": 13.3,
        "delay": 5.1
      },
      {
        "x": 796,
        "y": 539,
        "r": 2.7,
        "c": "#9ff5ff",
        "dur": 14.8,
        "delay": 9.3
      },
      {
        "x": 680,
        "y": 568,
        "r": 3.3,
        "c": "#7fffc2",
        "dur": 13.0,
        "delay": 5.6
      },
      {
        "x": 747,
        "y": 755,
        "r": 2.9,
        "c": "#ffd58a",
        "dur": 13.9,
        "delay": 9.2
      },
      {
        "x": 1247,
        "y": 463,
        "r": 3.4,
        "c": "#7fffc2",
        "dur": 8.1,
        "delay": 1.6
      },
      {
        "x": 332,
        "y": 494,
        "r": 4.2,
        "c": "#7fffc2",
        "dur": 12.0,
        "delay": 5.0
      },
      {
        "x": 1128,
        "y": 436,
        "r": 3.2,
        "c": "#ffd58a",
        "dur": 14.6,
        "delay": 0.6
      },
      {
        "x": 409,
        "y": 641,
        "r": 3.2,
        "c": "#7fd7ff",
        "dur": 11.5,
        "delay": 1.5
      },
      {
        "x": 44,
        "y": 659,
        "r": 4.0,
        "c": "#9ff5ff",
        "dur": 12.1,
        "delay": 4.0
      },
      {
        "x": 162,
        "y": 877,
        "r": 2.1,
        "c": "#9ff5ff",
        "dur": 13.8,
        "delay": 1.6
      },
      {
        "x": 1494,
        "y": 779,
        "r": 1.8,
        "c": "#7fffc2",
        "dur": 11.0,
        "delay": 2.5
      },
      {
        "x": 1010,
        "y": 916,
        "r": 2.0,
        "c": "#9ff5ff",
        "dur": 11.5,
        "delay": 1.5
      },
      {
        "x": 1172,
        "y": 710,
        "r": 3.2,
        "c": "#7fd7ff",
        "dur": 8.4,
        "delay": 6.9
      },
      {
        "x": 1460,
        "y": 563,
        "r": 3.2,
        "c": "#7fffc2",
        "dur": 12.2,
        "delay": 1.4
      },
      {
        "x": 1493,
        "y": 772,
        "r": 3.3,
        "c": "#7fd7ff",
        "dur": 13.6,
        "delay": 8.4
      },
      {
        "x": 917,
        "y": 799,
        "r": 1.6,
        "c": "#ffd58a",
        "dur": 11.5,
        "delay": 7.3
      },
      {
        "x": 712,
        "y": 965,
        "r": 2.5,
        "c": "#ffd58a",
        "dur": 9.2,
        "delay": 9.6
      },
      {
        "x": 1075,
        "y": 944,
        "r": 3.5,
        "c": "#7fd7ff",
        "dur": 12.6,
        "delay": 1.1
      },
      {
        "x": 683,
        "y": 552,
        "r": 2.4,
        "c": "#7fd7ff",
        "dur": 10.0,
        "delay": 9.6
      },
      {
        "x": 739,
        "y": 546,
        "r": 4.1,
        "c": "#9ff5ff",
        "dur": 15.9,
        "delay": 6.4
      },
      {
        "x": 1356,
        "y": 569,
        "r": 3.9,
        "c": "#9ff5ff",
        "dur": 13.4,
        "delay": 8.8
      },
      {
        "x": 782,
        "y": 491,
        "r": 4.3,
        "c": "#9ff5ff",
        "dur": 13.5,
        "delay": 8.7
      },
      {
        "x": 841,
        "y": 682,
        "r": 2.3,
        "c": "#7fffc2",
        "dur": 15.5,
        "delay": 0.8
      },
      {
        "x": 982,
        "y": 572,
        "r": 2.4,
        "c": "#ffd58a",
        "dur": 10.9,
        "delay": 1.0
      },
      {
        "x": 372,
        "y": 781,
        "r": 3.2,
        "c": "#7fffc2",
        "dur": 9.0,
        "delay": 1.6
      },
      {
        "x": 964,
        "y": 726,
        "r": 1.8,
        "c": "#7fffc2",
        "dur": 11.7,
        "delay": 1.5
      },
      {
        "x": 1324,
        "y": 997,
        "r": 3.0,
        "c": "#7fffc2",
        "dur": 8.1,
        "delay": 0.9
      },
      {
        "x": 519,
        "y": 955,
        "r": 2.7,
        "c": "#7fffc2",
        "dur": 14.5,
        "delay": 9.9
      },
      {
        "x": 1191,
        "y": 689,
        "r": 3.1,
        "c": "#7fd7ff",
        "dur": 9.5,
        "delay": 6.0
      },
      {
        "x": 165,
        "y": 456,
        "r": 2.0,
        "c": "#9ff5ff",
        "dur": 13.7,
        "delay": 1.6
      },
      {
        "x": 1167,
        "y": 722,
        "r": 4.3,
        "c": "#7fffc2",
        "dur": 14.9,
        "delay": 6.6
      }
    ],
    "sweep": {
      "y": 500,
      "h": 340
    }
  }
};

/** Keyed by route path. Routes not listed here keep the classic jumbotron. */
export const HERO_PAGES: Record<string, HeroPage> = {
  "/": {
    "scene": "landing",
    "eyebrow": "24/7 Intelligent Security",
    "titleLead": "Protect What",
    "titleAccent": "Matters Most",
    "text": "Cameras, access control, remote monitoring and drone patrols for homes and enterprises, all managed from one place.",
    "chip": "ALL SYSTEMS ARMED · 24/24 CAMERAS",
    "secondary": {
      "label": "View Plans",
      "route": "/plans"
    }
  },
  "/home": {
    "scene": "landing",
    "eyebrow": "24/7 Intelligent Security",
    "titleLead": "Protect What",
    "titleAccent": "Matters Most",
    "text": "Advanced security solutions for your home and business, designed, installed and monitored by DaiRec Vision.",
    "chip": "ALL SYSTEMS ARMED · 24/24 CAMERAS",
    "secondary": {
      "label": "View Plans",
      "route": "/plans"
    }
  },
  "/protect": {
    "scene": "install",
    "eyebrow": "CCTV & IP Cameras",
    "titleLead": "See Everything.",
    "titleAccent": "Miss Nothing.",
    "text": "4K camera systems engineered for crystal-clear surveillance, day or night, installed by certified technicians.",
    "chip": "4K RECORDING · NIGHT VISION ON",
    "secondary": {
      "label": "View Plans",
      "route": "/plans"
    }
  },
  "/surveil": {
    "scene": "surveil",
    "eyebrow": "Video Surveillance",
    "titleLead": "Never in the Dark.",
    "titleAccent": "Always in Control.",
    "text": "Live feeds, AI analytics and instant alerts on any device, wherever you are.",
    "chip": "4 FEEDS LIVE · CLOUD SYNCED",
    "secondary": {
      "label": "Remote Monitoring",
      "route": "/surveil/monitor"
    }
  },
  "/surveil/monitor": {
    "scene": "surveil",
    "eyebrow": "Remote Monitoring",
    "titleLead": "Your Property, Live.",
    "titleAccent": "Anytime, Anywhere.",
    "text": "Live streaming, encrypted cloud video and 24/7 professional monitoring with verified dispatch.",
    "chip": "MONITORING CENTER · ONLINE",
    "secondary": {
      "label": "View Plans",
      "route": "/plans"
    }
  },
  "/access": {
    "scene": "access",
    "eyebrow": "Access Control",
    "titleLead": "Control Who Enters.",
    "titleAccent": "Track Who Leaves.",
    "text": "Keyless, biometric and mobile credentials with a real-time audit trail for every door and gate.",
    "chip": "DOORS SECURED · 3 ZONES",
    "secondary": {
      "label": "View Plans",
      "route": "/plans"
    }
  },
  "/drone": {
    "scene": "surveil",
    "eyebrow": "Drone Surveillance",
    "titleLead": "Eyes in the Sky.",
    "titleAccent": "Always on Patrol.",
    "text": "Docked drones that launch on schedule or on alarm and stream live aerial video to your team, wherever local rules permit.",
    "chip": "PATROL READY · DOCK CHARGED",
    "secondary": {
      "label": "See Drone Plans",
      "route": "/plans",
      "audience": "enterprise"
    }
  },
  "/plans": {
    "scene": "home",
    "eyebrow": "Plans & Pricing",
    "titleLead": "Security for",
    "titleAccent": "Every Property.",
    "text": "Simple monthly plans for homes, businesses and enterprise sites, with professional installation included.",
    "chip": "ALL SYSTEMS ARMED · 24/24 CAMERAS",
    "secondary": {
      "label": "Explore Services",
      "route": "/protect"
    }
  }
};
