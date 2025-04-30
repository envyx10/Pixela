"use client";
import { useEffect, useCallback, useMemo } from "react";
import { ImageCarousel, NavigationControls, ProgressIndicator, ContentSection} from "../components";
import { useHeroStore } from "../store";

interface HeroSectionProps {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export const HeroSection = ({
  title,
  accentTitle,
  description,
  secondaryButtonText,
  images = [],
}: HeroSectionProps) => {

  const { currentImageIndex, isPlaying, setProgress, nextImage, resetProgress} = useHeroStore();

  // Memoizar la longitud del array de imágenes para evitar recreaciones
  const imagesLength = useMemo(() => images.length, [images]);

  // Funcion para avanzar a la siguiente imagen con useCallback
  const handleNextImage = useCallback(() => {
    nextImage(imagesLength);
  }, [nextImage, imagesLength]);
  
  // Efecto para el carrusel automático
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && imagesLength > 0) {
      // Intervalo para la presentación de diapositivas
      interval = setInterval(() => {
        handleNextImage();
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, handleNextImage, imagesLength]);

  // Efecto separado para la barra de progreso
  useEffect(() => {
    if (isPlaying) {
      // Resetear el progreso cuando cambia la imagen
      resetProgress();
      
      // Intervalo para la barra de progreso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 25);
      
      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [isPlaying, currentImageIndex, setProgress, resetProgress]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ImageCarousel images={images} />
      <NavigationControls imagesLength={imagesLength}/>
      <ProgressIndicator images={images}/>
  
      <ContentSection 
        title={title} 
        accentTitle={accentTitle}
        description={description}
        secondaryButtonText={secondaryButtonText}
        images={images}
      />
    </div>
  );
}; 