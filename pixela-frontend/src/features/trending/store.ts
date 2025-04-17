// features/trending/store/store.ts
import { create } from "zustand";
import { TrendingSerie } from "./type";

interface TrendingStoreState {
  series: TrendingSerie[];
  setSeries: (series: TrendingSerie[]) => void;
}

export const useTrendingStore = create<TrendingStoreState>((set) => ({
  series: [],
  setSeries: (series) => set({ series }),
}))