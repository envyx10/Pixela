import { create } from 'zustand';
import { HeroState } from './type';

const FADE_ANIMATION_DURATION = 300;

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

  /**
   ** Función auxiliar que encapsula la lógica común de transición entre imágenes.
   ** Maneja el estado de fade y la actualización del índice de la imagen actual.
   * 
   * @param calculateNewIndex - Función que calcula el nuevo índice de la imagen
   */
  const transitionToImage = (
    calculateNewIndex: (currentImageIndex: number) => number
  ) => {
    set({ fadeIn: false });
    setTimeout(() => {
      set((state) => ({
        currentImageIndex: calculateNewIndex(state.currentImageIndex),
        fadeIn: true,
        progress: 0,
      }));
    }, FADE_ANIMATION_DURATION);
  };

  return {
    currentImageIndex: 0,
    fadeIn: true,
    isPlaying: true,
    progress: 0,

    /**
     ** Actualiza el índice de la imagen actual
     ** @param index - Nuevo índice de la imagen
     */
    setCurrentImageIndex: (index: number) => set({ currentImageIndex: index }),

    /**
     ** Actualiza el estado de la animación de fade
     * @param newFadeIn - Nuevo estado del fade
     */
    setFadeIn: (newFadeIn: boolean) => set({ fadeIn: newFadeIn }),

    /**
     ** Actualiza el estado de reproducción
     * @param newIsPlaying - Nuevo estado de reproducción
     */
    setIsPlaying: (newIsPlaying: boolean) => set({ isPlaying: newIsPlaying }),

    /**
     **	 Actualiza el progreso de la animación
     * @param value - Nuevo valor de progreso o función para calcularlo
     */
    setProgress: (value: number | ((prevProgress: number) => number)) =>
      set((state) => ({
        progress:
          typeof value === 'function'
            ? value(state.progress)
            : value,
      })),

    /**
     ** Reinicia el progreso a 0
     */
    resetProgress: () => set({ progress: 0 }),

    /**
     ** Navega a la imagen anterior
     * @param imagesLength - Número total de imágenes disponibles
     */
    prevImage: (imagesLength: number) => {
      transitionToImage(
        (currentImageIndex) => (currentImageIndex - 1 + imagesLength) % imagesLength
      );
    },

    /**
     ** Navega a la siguiente imagen
     * @param imagesLength - Número total de imágenes disponibles
     */
    nextImage: (imagesLength: number) => {
      transitionToImage(
        (currentImageIndex) => (currentImageIndex + 1) % imagesLength
      );
    },

    /**
     ** Cambia directamente a una imagen específica
     * @param index - Índice de la imagen a la que se desea navegar
     */
    handleSlideChange: (index: number) => {
      transitionToImage(() => index);
    },
  };
});
