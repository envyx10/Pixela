export type MediaType = 'serie' | 'pelicula';

import { Actor } from './people';
import { Trailer, WatchProvider, Image } from './supplements';

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
  duracion?: number;
  creador?: {
    id: number;
    nombre: string;
    foto: string;
  };
  imagenes?: Image[];
} 