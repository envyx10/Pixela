export type MediaType = 'serie' | 'pelicula';

export interface Actor {
  id: string;
  nombre: string;
  foto: string;
  personaje: string;
}

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
}

export interface Media {
  id: string;
  titulo: string;
  sinopsis: string;
  fecha: string;
  generos: string[];
  poster: string;
  backdrop: string;
  puntuacion: number;
  tipo: MediaType;
  actores: Actor[];
  trailers: Trailer[];
  proveedores?: WatchProvider[];
}

export interface Creator {
  id: string;
  nombre: string;
  foto: string;
}

export interface Serie extends Media {
  temporadas: number;
  episodios: number;
  creadores?: Creator[];
}

export interface Pelicula extends Media {
  duracion: number;
} 