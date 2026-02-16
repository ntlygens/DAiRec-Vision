import { DRVRouteInterface } from './models/ui-x';

export const MAINROUTES: DRVRouteInterface[] = [
    {
        path: '',
        loadChildren: () => import('./modules/landing/landing-module')
            .then(m => m.LandingModule
        ),
        data: {
            breadcrumb: 'Landing'
        }
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home-module')
            .then(m => m.HomeModule
        ),
        data: {
            breadcrumb: 'Home'
        }
    },
    {
        path: 'about',
        loadChildren: () => import('./modules/home/home-module')
            .then(m => m.HomeModule
        ),
        data: {
            breadcrumb: 'About'
        }
    },
    
];


