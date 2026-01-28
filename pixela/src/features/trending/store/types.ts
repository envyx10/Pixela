import { TrendingSerie, TrendingMovie } from '@/features/trending/types';

/**
 * Tipo que representa el tipo de medio (series o películas)
 */
export type MediaType = 'series' | 'movies';

/**
 * Interfaz que define el estado y las acciones del store de tendencias
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 * @property {(series: TrendingSerie[]) => void} setSeries - Función para actualizar las series
 * @property {(movies: TrendingMovie[]) => void} setMovies - Función para actualizar las películas
 * @property {(type: MediaType) => TrendingSerie[] | TrendingMovie[]} getContentByType - Función para obtener el contenido según el tipo
 */
export interface TrendingStoreState {
  series: TrendingSerie[];
  movies: TrendingMovie[];
  setSeries: (series: TrendingSerie[]) => void;
  setMovies: (movies: TrendingMovie[]) => void;
  getContentByType: (type: MediaType) => TrendingSerie[] | TrendingMovie[];
} 