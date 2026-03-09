import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService implements OnInit
 {
  private pgLoc$ = new BehaviorSubject<string | null>(null);
  public currentPgLoc$: Observable<string | null> = this.pgLoc$.asObservable();
  

  breadcrumbs: Breadcrumb[] = [];
  currntRoute: string = '';
  routerSub: Subscription = new Subscription();
  router: Router;
  activatedRoute: ActivatedRoute;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currntRoute = event.urlAfterRedirects;
        // console.log('Current Route in BreadcrumbService:', this.currntRoute);
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
        // console.log('Breadcrumbs service:', this.breadcrumbs);
    });
  }

  createBreadcrumbs(
      route: ActivatedRoute, 
      url: string = '', 
      breadcrumbs: Breadcrumb[] = []
    ): Breadcrumb[] {
          const children: ActivatedRoute[] = route.children;
          if (children.length === 0) {
            return breadcrumbs;
          }

          for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
              url += `/${routeURL}`;
            }

            const label = child.snapshot.data['breadcrumb'];
              if (label !== 'home') {
                breadcrumbs.push({ label, url });
              }

            return this.createBreadcrumbs(child, url, breadcrumbs);
          }

          return breadcrumbs;
    } 


  // breadcrumbs = [] as Array<{ label: string, url: string }>;

  // constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
  //   // this.router.events
  //   //   .pipe(filter(event => event instanceof NavigationEnd))
  //   //   .subscribe(() => {
  //   //     this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  //   //     console.log('Updated Breadcrumbs:', this.breadcrumbs);
  //   // });

  // }

  // ngOnInit(): void {
  //   // this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  //   this.router.events
  //     .pipe(filter(event => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  //       // console.log('Updated Breadcrumbs:', this.breadcrumbs);
  //       // console.log('Updated Breadcrumbs:', this.activatedRoute);
  //   });

  // }

  // createBreadcrumbs(
  //     route: ActivatedRoute, 
  //     url: string = '', 
  //     breadcrumbs: Breadcrumb[] = []
  //   ): Breadcrumb[] {
  //       // const children: ActivatedRoute[] = route.children;
  //       // Array<{ label: string, url: string }> = [])
  //     // : 
  //     //   Array<{ label: string, url: string }> 
  //       // {
  //         const children: ActivatedRoute[] = route.children;
  //         if (children.length === 0) {
  //           // console.log('c_l: ', children.length);
  //           // breadcrumbs.push({label: 'home', url: '/'});
  //           // console.log('bc_: ', breadcrumbs);
  //           return breadcrumbs;
  //           // return [{label: "done", url: "/"}];
  //         }

  //         for (const child of children) {
  //           const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
  //           if (routeURL !== '') {
  //             url += `/${routeURL}`;
  //           }

  //           const label = child.snapshot.data['breadcrumb'];
  //             if (label !== 'home') {
  //               breadcrumbs.push({ label, url });
  //             }

  //           // breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url });
  //           return this.createBreadcrumbs(child, url, breadcrumbs);
  //         }

  //         return breadcrumbs;
  //   }
}
