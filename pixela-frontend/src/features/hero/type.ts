/**
 * Interfaz que define la estructura del contenido del hero
 * @interface HeroContent
 * @property {string} title - Título del hero
 * @property {string} accentTitle - Título del hero
 * @property {string} description - Descripción del hero
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} images - Imágenes del hero
 * @property {number} currentImageIndex - Índice de la imagen actual
 */
export interface HeroContent {
    title: string;
    accentTitle: string;
    description: string;
    secondaryButtonText: string;
    images: string[];
    currentImageIndex?: number;
  }
  
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