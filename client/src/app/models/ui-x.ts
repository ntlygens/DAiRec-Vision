export enum UiXpType {
    LANDONG = 'landing' as any,
    HOME = 'home' as any,
    ABOUT = 'about' as any,
    SERVICES = 'services' as any,

}

export enum PgLocs {
    LANDING = 'landing' as any,
    HOME = 'home' as any,
    PROTECT = 'protect' as any,
    SURVEIL = 'surveil' as any,
    ACCESS = 'access' as any,
    CONTACT = 'contact' as any,
}

export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
    BUTTON = 'button' as any,
}

export enum CompSize {
    SMALL = 'small' as any,
    MEDIUM = 'medium' as any,
    LARGE = 'large' as any,
}

export enum Orientation {
    LANDSCAPE = 'landscape' as any,
    PORTRAIT = 'portrait' as any,
    SQUARE = 'square' as any,
}

export interface UserInterface {
    _id?: string;
    name: string;
    img: string;
    desc?: string;
    content?: string;
    pgLoc?: PgLocs | string;
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
  compSize?: CompSize;
  pgLoc?: PgLocs | string

}

export interface CardButtonModel {
  label: string;
  action: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  style?: 'flat' | 'raised' | 'stroked';
  url?: string;
}

export interface CardItemInterface {
  _id?: string;
  id?: string | number;   
  name?: string; 
  title?: string;
  subtitle?: string;
  desc?: string;
  content?: string;
  img?: string;
  imageAlt?: string;
  backgroundColor?: string;
  buttons?: CardButtonModel[];
  borderColor?: string;    
  orientation?: Orientation;
  metadata?: any;
  compType?: CompType;
  compSize?: CompSize;
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
    pgLoc?: PgLocs | string;
}