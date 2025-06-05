export type MediaType = 'serie' | 'pelicula';

import { Actor } from './people';
import { Trailer, WatchProvider, Image } from './supplements';

/**
 * Media
 * @interface Media
 * @property {string} id - ID de la película o serie
 * @property {string} titulo - Título de la película o serie
 * @property {string} sinopsis - Sinopsis de la película o serie
 * @property {string} fecha - Fecha de estreno de la película o serie
 * @property {string[]} generos - Géneros de la película o serie
 * @property {string} poster - URL de la imagen de la película o serie
 * @property {string} backdrop - URL de la imagen de fondo de la película o serie
 * @property {number} puntuacion - Puntuación de la película o serie
 * @property {MediaType} tipo - Tipo de película o serie
 * @property {Actor[]} actores - Actores de la película o serie
 * @property {Trailer[]} trailers - Trailers de la película o serie
 * @property {WatchProvider[]} proveedores - Proveedores de la película o serie
 * @property {number} duracion - Duración de la película o serie
 * @property {Object} creador - Creador de la película o serie
 * @property {Image[]} imagenes - Imágenes de la película o serie
 */
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