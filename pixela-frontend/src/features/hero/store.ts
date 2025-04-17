import { create } from 'zustand';
import { HeroState } from './type';

export const useHeroStore = create<HeroState>((set) => ({
  currentImageIndex: 0,
  fadeIn: true,
  isPlaying: true,
  progress: 0,
  imagesLength: 0,

  setCurrentImageIndex: (index) => set({ currentImageIndex: index }),
  setFadeIn: (state) => set({ fadeIn: state }),
  setIsPlaying: (state) => set({ isPlaying: state }),
  setProgress: (progress) =>
    set((state) => ({
      progress: typeof progress === 'function' ? progress(state.progress) : progress,
    })),
  setImagesLength: (length) => set({ imagesLength: length }),

  resetProgress: () => set({ progress: 0 }),

  prevImage: () => {
    set({ fadeIn: false });
    setTimeout(() => {
      set((state) => ({
        currentImageIndex: (state.currentImageIndex - 1 + state.imagesLength) % state.imagesLength,
        fadeIn: true,
        progress: 0,
      }));
    }, 300);
  },

  nextImage: () => {
    set({ fadeIn: false });
    setTimeout(() => {
      set((state) => ({
        currentImageIndex: (state.currentImageIndex + 1) % state.imagesLength,
        fadeIn: true,
        progress: 0,
      }));
    }, 300);
  },

  handleSlideChange: (index) => {
    set({ fadeIn: false });
    setTimeout(() => {
      set({
        currentImageIndex: index,
        fadeIn: true,
        progress: 0,
      });
    }, 300);
  },
}));
