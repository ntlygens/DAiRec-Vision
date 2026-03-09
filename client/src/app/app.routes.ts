import { DRVRouteInterface } from './models/ui-x';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const MAINROUTES: DRVRouteInterface[] = [
    {
        path: '',
        loadChildren: () => import('./modules/landing/landing-module')
            .then(m => m.LandingModule
        ),
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home-module')
            .then(m => m.HomeModule
        ),
        
    },
    {
        path: 'protect',
        loadChildren: () => import('./modules/protection/protection-module')
            .then(m => m.ProtectionModule
        ),
        data: {
            breadcrumb: 'Home',
        }
    },
    {
        path: 'surveil',
        loadChildren: () => import('./modules/surveillance/surveillance-module')
            .then(m => m.SurveillanceModule
        ),
        data: {
            breadcrumb: 'Home',
        }
    },
    {
        path: 'access',
        loadChildren: () => import('./modules/access-control/access-control-module')
            .then(m => m.AccessControlModule
        ),
        data: {
            breadcrumb: 'Home',
        }
    },
    
];


