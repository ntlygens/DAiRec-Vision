export enum CompFaceType {
    LANDING = 'landing' as any,
    HOME = 'home' as any,
    ABOUT = 'about' as any,
    CONTACT = 'contact' as any,
}

export enum Orientation {
    LANDSCAPE = 'landscape' as any,
    PORTRAIT = 'portrait' as any,
    SQUARE = 'square' as any,
}

export interface CardButtonModel {
  label: string;
  action: string;
  icon?: string;
  color?: 'primary' | 'accent' | 'warn';
  style?: 'flat' | 'raised' | 'stroked';
  url?: string;
}

export enum CompSize {
    SMALL = 'small' as any,
    MEDIUM = 'medium' as any,
    LARGE = 'large' as any,
}

export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
    BUTTON = 'button' as any,
}

// card-item.interface.ts
export interface CardItem {
  _id?: string;
  id?: string | number;    
  title?: string;
  subtitle?: string;
  desc?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  backgroundColor?: string;
  buttons?: CardButtonModel[];
  borderColor?: string;    
  orientation?: Orientation;
  metadata?: any;
  compType?: CompType;
  compSize?: CompSize;
}

export interface GridItem {
  data?: CardItem;
  cols: number;
  rows: number;
  isPlaceholder: boolean;
}