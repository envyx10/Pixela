// Contenido de la sección de contenido
export interface HeroContent {
    title: string;
    accentTitle: string;
    description: string;
    secondaryButtonText: string;
    ctaText: string;
    ctaLink: string;
    images: string[];
  }
  
// Estado global manejado por Zustand
export interface HeroState {
    currentImageIndex: number;
    fadeIn: boolean;
    isPlaying: boolean;
    progress: number;
    imagesLength: number;
  
    setCurrentImageIndex: (index: number) => void;
    setFadeIn: (state: boolean) => void;
    setIsPlaying: (state: boolean) => void;
    setProgress: (progress: number | ((prev: number) => number)) => void;
    setImagesLength: (length: number) => void;
  
    prevImage: () => void;
    nextImage: () => void;
    handleSlideChange: (index: number) => void;
    resetProgress: () => void;
  }