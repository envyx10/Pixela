import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "@/features/discover/types/media";

type MediaType = 'series' | 'movies';

/**
 * Interfaz para el estado del store de descubrimiento
 * @interface DiscoverStoreState
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 * @property {MediaType} activeType - Tipo de medio activo
 * @property {function} setSeries - Función para actualizar las series
 * @property {function} setMovies - Función para actualizar las películas
 * @property {function} setActiveType - Función para establecer el tipo activo
 */
interface DiscoverStoreState {
    series: TrendingSerie[];
    movies: TrendingMovie[];
    activeType: MediaType;
    setSeries: (series: TrendingSerie[]) => void;
    setMovies: (movies: TrendingMovie[]) => void;
    setActiveType: (type: MediaType) => void;
}

const initialState = {
    series: [],
    movies: [],
    activeType: 'series' as const,
};

/**
 * Hook para el estado de descubrimiento
 * @function useDiscoverStore - Hook para el estado de descubrimiento
 * @returns {DiscoverStoreState} - El estado de descubrimiento
 */
export const useDiscoverStore = create<DiscoverStoreState>((set) => ({
    ...initialState,
    setSeries: (series) => set({ series }),
    setMovies: (movies) => set({ movies }),
    setActiveType: (type) => set({ activeType: type }),
})); 