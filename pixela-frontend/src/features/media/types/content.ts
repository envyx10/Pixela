import { Media } from './mediaBase';
import { Creator } from './people';

export interface Serie extends Media {
  temporadas: number;
  episodios: number;
  creadores?: Creator[];
}

export interface Pelicula extends Media {
  duracion: number;
} 