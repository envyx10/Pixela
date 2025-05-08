export interface Trailer {
  id: string;
  nombre: string;
  key: string;
  site: string;
  tipo: string;
}

export interface WatchProvider {
  id: string;
  nombre: string;
  logo: string;
  tipo?: 'flatrate' | 'rent' | 'buy';
  url?: string;
}

export interface Image {
  id: string;
  url: string;
  tipo: string;
} 