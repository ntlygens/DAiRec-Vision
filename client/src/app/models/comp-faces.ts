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

export enum CompType {
    ARTICLE = 'article' as any,
    PRODUCT = 'product' as any,
    FEATURE = 'feature' as any,
    TESTIMONIAL = 'testimonial' as any,
    BANNER = 'banner' as any,
}

// card-item.interface.ts
export interface CardItem {
  _id?: string;
  id?: string | number;    
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  backgroundColor?: string;
  borderColor?: string;    
  orientation?: Orientation;
  metadata?: any;
  compType?: CompType;
}

export interface GridItem {
  data?: CardItem;
  cols: number;
  rows: number;
  isPlaceholder: boolean;
}