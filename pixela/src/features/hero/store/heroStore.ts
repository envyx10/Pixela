import { create } from "zustand";
import { HeroState } from "@/features/hero/types/state";

/**
 * Store de Zustand para el componente Hero.
 *
 * Este store maneja:
 * - Navegación entre imágenes (anterior, siguiente, específica)
 * - Estados de animación (fade in/out)
 * - Control de reproducción
 * - Progreso de la animación
 *
 * La transición entre imágenes incluye una animación de fade
 * que dura 300ms y reinicia el progreso de la animación.
 */
export const useHeroStore = create<HeroState>((set) => {
  return {
    currentImageIndex: 0,
    activeSlideIndex: 0, // Kept for compatibility, though redundant with currentImageIndex in this simplified version
    fadeIn: true, // Kept for compatibility with other components if they read it, but we won't toggle it
    isPlaying: true,
    progress: 0,

    /**
     * Actualiza el índice de la imagen actual
     * @param index - Nuevo índice de la imagen
     */
    setCurrentImageIndex: (index: number) =>
      set({ currentImageIndex: index, activeSlideIndex: index, progress: 0 }),

    /**
     * Actualiza el estado de la animación de fade
     * @param newFadeIn - Nuevo estado del fade (No-op in this simplified version)
     */
    setFadeIn: (newFadeIn: boolean) => set({ fadeIn: newFadeIn }),

    /**
     * Actualiza el estado de reproducción
     * @param newIsPlaying - Nuevo estado de reproducción
     */
    setIsPlaying: (newIsPlaying: boolean) => set({ isPlaying: newIsPlaying }),

    /**
     * Actualiza el progreso de la animación
     * @param value - Nuevo valor de progreso o función para calcularlo
     */
    setProgress: (value: number | ((prevProgress: number) => number)) =>
      set((state) => ({
        progress: typeof value === "function" ? value(state.progress) : value,
      })),

    /**
     * Reinicia el progreso a 0
     */
    resetProgress: () => set({ progress: 0 }),

    /**
     * Navega a la imagen anterior
     * @param imagesLength - Número total de imágenes disponibles
     */
    prevImage: (imagesLength: number) => {
      set((state) => {
        const nextIndex = (state.currentImageIndex - 1 + imagesLength) % imagesLength;
        return {
            currentImageIndex: nextIndex,
            activeSlideIndex: nextIndex,
            progress: 0
        };
      });
    },

    /**
     * Navega a la siguiente imagen
     * @param imagesLength - Número total de imágenes disponibles
     */
    nextImage: (imagesLength: number) => {
      set((state) => {
        const nextIndex = (state.currentImageIndex + 1) % imagesLength;
        return {
            currentImageIndex: nextIndex,
            activeSlideIndex: nextIndex,
            progress: 0
        };
      });
    },

    /**
     * Cambia directamente a una imagen específica
     * @param index - Índice de la imagen a la que se desea navegar
     */
    handleSlideChange: (index: number) => {
      set({ currentImageIndex: index, activeSlideIndex: index, progress: 0 });
    },
  };
});
