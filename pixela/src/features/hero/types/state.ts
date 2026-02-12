/**
 * Estado global manejado por Zustand
 * @interface HeroState
 * @property {number} currentImageIndex - Índice de la imagen actual
 * @property {boolean} fadeIn - Si se está aplicando el efecto de desvanecimiento
 * @property {boolean} isPlaying - Si se está reproduciendo el video
 * @property {number} progress - Progreso de la reproducción del video
 * @property {number} imagesLength - Longitud de la lista de imágenes
 * @property {function} setCurrentImageIndex - Función para establecer el índice de la imagen actual
 * @property {function} setFadeIn - Función para establecer el estado de desvanecimiento
 * @property {function} setIsPlaying - Función para establecer el estado de reproducción
 * @property {function} setProgress - Función para establecer el progreso de la reproducción
 * @property {function} prevImage - Función para navegar a la imagen anterior
 * @property {function} nextImage - Función para navegar a la imagen siguiente
 * @property {function} handleSlideChange - Función para manejar el cambio de imagen
 * @property {function} resetProgress - Función para reiniciar el progreso de la reproducción
 */
export interface HeroState {
  currentImageIndex: number;
  activeSlideIndex: number;
  fadeIn: boolean;
  isPlaying: boolean;
  progress: number;

  /** Acciones */
  setCurrentImageIndex: (index: number) => void;
  setFadeIn: (state: boolean) => void;
  setIsPlaying: (state: boolean) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  prevImage: (imagesLength: number) => void;
  nextImage: (imagesLength: number) => void;
  handleSlideChange: (index: number) => void;
  resetProgress: () => void;
}
