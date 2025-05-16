import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "./type";

interface DiscoverStoreState {
    series: TrendingSerie[];
    movies: TrendingMovie[];
    activeType: 'series' | 'movies';
    setSeries: (series: TrendingSerie[]) => void;
    setMovies: (movies: TrendingMovie[]) => void;
    setActiveType: (type: 'series' | 'movies') => void;
}

export const useDiscoverStore = create<DiscoverStoreState>((set) => ({
    series: [],
    movies: [],
    activeType: 'series',
    setSeries: (series) => set({ series }),
    setMovies: (movies) => set({ movies }),
    setActiveType: (type) => set({ activeType: type }),
})); 