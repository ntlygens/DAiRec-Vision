import { DRVRouteInterface } from './models/ui-x';

export const MAINROUTES: DRVRouteInterface[] = [
    { path: '',        title: 'Security Cameras, Monitoring & Access Control', loadChildren: () => import('./modules/landing/landing-module').then(m => m.LandingModule) },
    { path: 'home',    title: 'Home', data: { description: "Licensed, insured security installers for the Tri-State area: 4K CCTV, video surveillance, 24/7 monitoring, access control and drone patrols, with a free on-site assessment." }, loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule) },
    { path: 'protect', title: 'CCTV & IP Camera Installation', data: { description: "Professionally designed 4K CCTV and IP camera systems, installed by certified technicians. Clear footage day or night, viewable from any device." }, loadChildren: () => import('./modules/protection/protection-module').then(m => m.ProtectionModule) },
    { path: 'surveil', title: 'Video Surveillance', data: { description: "24/7 video surveillance with live view, smart motion alerts and on-site plus cloud recording for homes, businesses and multi-site properties." }, loadChildren: () => import('./modules/surveillance/surveillance-module').then(m => m.SurveillanceModule) },
    { path: 'monitor', title: 'Remote Monitoring', data: { description: "Trained operators watch your cameras around the clock, verify alarms against live video and dispatch help when it's real." }, loadChildren: () => import('./modules/monitoring/monitoring-module').then(m => m.MonitoringModule) },
    { path: 'access',  title: 'Access Control', data: { description: "Keycards, mobile credentials and biometrics with a real-time audit trail. Control who gets in, when, at every door." }, loadChildren: () => import('./modules/access-control/access-control-module').then(m => m.AccessControlModule) },
    { path: 'drone',   title: 'Drone Surveillance', data: { description: "Automated drone patrols with thermal imaging and alarm-triggered response for large and remote sites, flown by FAA Part 107 pilots where the law allows." }, loadChildren: () => import('./modules/drone/drone-module').then(m => m.DroneModule) },
    { path: 'plans',   title: 'Plans & Pricing', data: { description: "Simple monthly security plans for homes and businesses: leased, maintained equipment, optional 24/7 monitoring and a free on-site assessment." }, loadChildren: () => import('./modules/plans/plans-module').then(m => m.PlansModule) },
    { path: '**',      redirectTo: '' },
];
