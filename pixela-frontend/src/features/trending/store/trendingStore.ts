import { create } from "zustand";
import { TrendingStoreState } from "./types";

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