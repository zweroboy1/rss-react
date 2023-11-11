export interface Beer {
  id: number;
  title: string;
  tag: string;
  date: string;
  description: string;
  image: string;
}
export interface BeerApi {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
}

export type ServerResponse = BeerApi[];

export type LoadingStatus = 'idle' | 'loading' | 'error' | 'success';
