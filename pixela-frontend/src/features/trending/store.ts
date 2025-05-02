// features/trending/store/store.ts
import { create } from "zustand";
import { TrendingSerie, TrendingMovie } from "./type";

interface TrendingStoreState {
  series: TrendingSerie[];
  movies: TrendingMovie[];
  setSeries: (series: TrendingSerie[]) => void;
  setMovies: (movies: TrendingMovie[]) => void;
}

export const useTrendingStore = create<TrendingStoreState>((set) => ({
  series: [],
  movies: [],
  setSeries: (series) => set({ series }),
  setMovies: (movies) => set({ movies }),
}))