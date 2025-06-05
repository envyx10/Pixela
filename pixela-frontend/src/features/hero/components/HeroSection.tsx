"use client";
import { useEffect, useCallback, useMemo } from "react";
import { ImageCarousel, NavigationControls, ProgressIndicator, ContentSection} from "../components/index";
import { useHeroStore } from "../store/heroStore";

const STYLES = {
  hero: {
    base: "relative w-full min-h-[80vh] sm:min-h-[85vh] md:min-h-screen lg:h-screen overflow-hidden px-4 sm:px-6 md:px-8 lg:px-0",
    ipadFix: "sm:[min-height:1180px]:min-h-screen sm:[min-width:820px]:min-h-screen"
  }
} as const;

/**
 * Props para el componente HeroSection
 * @property {string} title - Título principal del hero
 * @property {string} accentTitle - Título acentuado que complementa al título principal
 * @property {string} description - Descripción detallada de la sección
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} [images] - Array opcional de URLs de imágenes para el carrusel
 * @property {string} [ctaText] - Texto opcional para el botón CTA
 * @property {string} [ctaLink] - Enlace opcional para el botón CTA
 */
interface HeroSectionProps {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Hook personalizado para manejar la lógica del carrusel automático
 */
const useCarouselAutoPlay = (imagesLength: number) => {
  const { isPlaying, nextImage } = useHeroStore();

  const handleNextImage = useCallback(() => {
    nextImage(imagesLength);
  }, [nextImage, imagesLength]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && imagesLength > 0) {
      interval = setInterval(handleNextImage, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, handleNextImage, imagesLength]);

  return handleNextImage;
};

/**
 * Hook personalizado para manejar la lógica de la barra de progreso
 */
const useProgressBar = () => {
  const { isPlaying, currentImageIndex, setProgress, resetProgress } = useHeroStore();

  useEffect(() => {
    if (isPlaying) {
      resetProgress();
      
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 100));
      }, 25);
      
      return () => clearInterval(progressInterval);
    }
  }, [isPlaying, currentImageIndex, setProgress, resetProgress]);
};

/**
 * Componente principal que muestra la sección hero de la página
 * Incluye carrusel de imágenes, controles de navegación y contenido principal
 */
export const HeroSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
  images = [],
}: HeroSectionProps) => {
  const imagesLength = useMemo(() => images.length, [images]);
  const { currentImageIndex } = useHeroStore();
  
  useCarouselAutoPlay(imagesLength);
  useProgressBar();
  
  return (
    <div className={`${STYLES.hero.base} ${STYLES.hero.ipadFix}`}>
      <ImageCarousel images={images} />
      <NavigationControls imagesLength={imagesLength}/>
      <ProgressIndicator images={images}/>
  
      <ContentSection 
        title={title} 
        accentTitle={accentTitle}
        description={description}
        secondaryButtonText={secondaryButtonText}
        images={images}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
}; 