import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "./type";

type MediaType = 'series' | 'movies';

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

export const useDiscoverStore = create<DiscoverStoreState>((set) => ({
    ...initialState,
    setSeries: (series) => set({ series }),
    setMovies: (movies) => set({ movies }),
    setActiveType: (type) => set({ activeType: type }),
})); 