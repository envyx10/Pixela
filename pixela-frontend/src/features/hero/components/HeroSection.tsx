"use client";
import { useEffect, useCallback } from "react";
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
  ctaText = "",
  ctaLink = ""
}: HeroSectionProps) => {

  const { 
    currentImageIndex, 
    isPlaying, 
    setProgress, 
    nextImage, 
    resetProgress,
    setImagesLength
  } = useHeroStore();

  // Configurar la longitud de imágenes en el store cuando cambia
  useEffect(() => {
    setImagesLength(images.length);
  }, [images.length, setImagesLength]);

  // Funcion para avanzar a la siguiente imagen
  const handleNextImage = useCallback(() => {
    nextImage();
  }, [nextImage]);
  
  // Efecto para el carrusel automático
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Intervalo para la presentación de diapositivas
      interval = setInterval(() => {
        handleNextImage();
      }, 5000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, handleNextImage]);

  // Efecto separado para la barra de progreso
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      // Resetear el progreso cuando cambia la imagen
      resetProgress();
      
      // Intervalo para la barra de progreso
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5; 
        });
      }, 25);
    }
    
    return () => {
      clearInterval(progressInterval);
    };
  }, [isPlaying, currentImageIndex, setProgress, resetProgress]);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ImageCarousel images={images} />
      <NavigationControls />
      <ProgressIndicator images={images}/>
      <ContentSection 
        title={title} 
        accentTitle={accentTitle}
        description={description}
        secondaryButtonText={secondaryButtonText}
        ctaText={ctaText}
        ctaLink={ctaLink}
        images={images}
      />
    </div>
  );
}; 