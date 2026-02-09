export enum CompFaceType {
    LANDING = 'landing' as any,
    HOME = 'home' as any,
    ABOUT = 'about' as any,
    CONTACT = 'contact' as any,
}

export interface MainRouterInterface {
  title?: string;
  redirectTo?: string;
  loadChildren?: any;
  pathMatch?: any;
  path: string;
  component?: any;
  data?: {
      state: string;
      animation: string;
      mobile?: any;
  };
  children?: any;
  outlets?: any;
  outlet?: string;
  formType?: CompFaceType;
}