// features/trending/store/store.ts
import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "./type";

/**
 * Tipo que representa el tipo de medio (series o películas)
 */
type MediaType = 'series' | 'movies';

/**
 * Interfaz que define el estado y las acciones del store de tendencias
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 * @property {(series: TrendingSerie[]) => void} setSeries - Función para actualizar las series
 * @property {(movies: TrendingMovie[]) => void} setMovies - Función para actualizar las películas
 * @property {(type: MediaType) => TrendingSerie[] | TrendingMovie[]} getContentByType - Función para obtener el contenido según el tipo
 */
interface TrendingStoreState {
  series: TrendingSerie[];
  movies: TrendingMovie[];
  setSeries: (series: TrendingSerie[]) => void;
  setMovies: (movies: TrendingMovie[]) => void;
  getContentByType: (type: MediaType) => TrendingSerie[] | TrendingMovie[];
}

/**
 * Store de Zustand para gestionar el estado de las tendencias
 * Proporciona funciones para actualizar y obtener series y películas en tendencia
 */
export const useTrendingStore = create<TrendingStoreState>((set, get) => ({
  series: [],
  movies: [],
  setSeries: (series) => set({ series }),
  setMovies: (movies) => set({ movies }),
  getContentByType: (type) => type === 'series' ? get().series : get().movies,
}));