import { DRVRouteInterface } from './models/ui-x';

export const MAINROUTES: DRVRouteInterface[] = [
    { path: '',        loadChildren: () => import('./modules/landing/landing-module').then(m => m.LandingModule) },
    { path: 'home',    loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule) },
    { path: 'protect', loadChildren: () => import('./modules/protection/protection-module').then(m => m.ProtectionModule) },
    { path: 'surveil', loadChildren: () => import('./modules/surveillance/surveillance-module').then(m => m.SurveillanceModule) },
    { path: 'monitor', loadChildren: () => import('./modules/monitoring/monitoring-module').then(m => m.MonitoringModule) },
    { path: 'access',  loadChildren: () => import('./modules/access-control/access-control-module').then(m => m.AccessControlModule) },
    { path: 'drone',   loadChildren: () => import('./modules/drone/drone-module').then(m => m.DroneModule) },
    { path: 'plans',   loadChildren: () => import('./modules/plans/plans-module').then(m => m.PlansModule) },
    { path: '**',      redirectTo: '' },
];
