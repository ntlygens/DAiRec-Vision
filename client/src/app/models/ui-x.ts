export enum UiXpType {
    LANDONG = 'landing' as any,
    HOME = 'home' as any,
    ABOUT = 'about' as any,
    SERVICES = 'services' as any,

}
export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
}

export interface UserInterface {
    _id?: string;
    name: string;
    img: string;
    desc?: string;
    content?: string;
    pgLoc: "Landing" | "Home" | "About" | "Services"
}

export interface ServiceScreenInterface {
  _id?: string;
  name?: string;
  title?: string;
  subtitle?: string;
  desc?: string;    
  content?: Blob;
  img?: string;
  rte?: string;
  num?: number;
  compType?: CompType;

}

export interface DRVRouteInterface {
  title?: string;
    redirectTo?: string;
    loadChildren?: any;
    pathMatch?: any;
    path: string;
    component?: any;
    data?: {
        state?: string;
        animation?: string;
        mobile?: any;
        breadcrumb?: string;
    };
    children?: any;
    outlets?: any;
    outlet?: string;
    formType?: UiXpType;
}