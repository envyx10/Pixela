'use client';

import { useCallback, useEffect, useState, ReactNode, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SliderNavButton } from '@/shared/components/SliderNavButton';
import clsx from 'clsx';

interface MediaCarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  slidesClassName?: string;
  className?: string;
  initialIndex?: number;
}

export const MediaCarousel = ({ 
  children, 
  autoplay = true, 
  autoplayInterval = 6000,
  slidesClassName = '',
  className = '',
  initialIndex = 0
}: MediaCarouselProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Memoizar opciones del carrusel para evitar recreaciones
  const carouselOptions = useMemo(() => ({
    loop: true,
    align: 'start' as const,
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps' as const,
    slidesToScroll: 1,
    duration: 50,
    startIndex: initialIndex
  }), [initialIndex]);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);
  
  // Gestión optimizada de eventos de arrastre
  useEffect(() => {
    if (!emblaApi) return;
    
    const onDragStart = () => setIsDragging(true);
    const onDragEnd = () => setIsDragging(false);
    
    emblaApi.on('pointerDown', onDragStart);
    emblaApi.on('pointerUp', onDragEnd);
    
    return () => {
      emblaApi.off('pointerDown', onDragStart);
      emblaApi.off('pointerUp', onDragEnd);
    };
  }, [emblaApi]);
  
  // Autoplay con retraso adaptativo
  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    
    let intervalId: NodeJS.Timeout;
    
    const startAutoplay = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!document.hidden) {
          emblaApi.scrollNext();
        }
      }, autoplayInterval);
    };
    
    // Iniciar autoplay
    startAutoplay();
    
    // Reiniciar autoplay después de interacción
    emblaApi.on('pointerUp', startAutoplay);
    
    // Pausar cuando la pestaña no está visible
    document.addEventListener('visibilitychange', startAutoplay);
    
    return () => {
      clearInterval(intervalId);
      emblaApi.off('pointerUp', startAutoplay);
      document.removeEventListener('visibilitychange', startAutoplay);
    };
  }, [emblaApi, autoplay, autoplayInterval]);
  
  // Funciones de navegación memoizadas
  const scrollPrev = useCallback(() => 
    emblaApi?.scrollPrev(), [emblaApi]);
  
  const scrollNext = useCallback(() => 
    emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={clsx("relative", className)}>
      <div 
        className={clsx(
          "embla overflow-hidden w-full cursor-grab",
          { "cursor-grabbing": isDragging }
        )}
        ref={emblaRef}
      >
        <div className={clsx("embla__container", slidesClassName)}>
          {children}
        </div>
      </div>
      
      <SliderNavButton 
        direction="prev"
        onClick={scrollPrev}
        ariaLabel="Anterior"
        icon={<FiChevronLeft className="h-6 w-6" />}
        className="top-[50%]"
      />
      <SliderNavButton 
        direction="next"
        onClick={scrollNext}
        ariaLabel="Siguiente"
        icon={<FiChevronRight className="h-6 w-6" />}
        className="top-[50%]"
      />
    </div>
  );
}; 