/**
 ** Interfaz que define la 
 ** estructura del contenido del hero
 */
export interface HeroContent {
    title: string;
    accentTitle: string;
    description: string;
    secondaryButtonText: string;
    images: string[];
  }
  
/**
** Estado global manejado por Zustand
**/
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