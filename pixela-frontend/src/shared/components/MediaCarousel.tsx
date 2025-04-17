'use client';
import { useCallback, useEffect, useState, ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SliderNavButton } from './SliderNavButton';
import clsx from 'clsx';

interface MediaCarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  slidesClassName?: string;
  className?: string;
}

export const MediaCarousel = ({ 
  children, 
  autoplay = true, 
  autoplayInterval = 6000,
  slidesClassName = '',
  className = ''
}: MediaCarouselProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    duration: 50
  });
  
  useEffect(() => {
    if (emblaApi) {
      const onDragStart = () => setIsDragging(true);
      const onDragEnd = () => setIsDragging(false);
      
      emblaApi.on('pointerDown', onDragStart);
      emblaApi.on('pointerUp', onDragEnd);
      
      return () => {
        emblaApi.off('pointerDown', onDragStart);
        emblaApi.off('pointerUp', onDragEnd);
      };
    }
  }, [emblaApi]);
  
  useEffect(() => {
    if (emblaApi && autoplay) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, autoplayInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [emblaApi, autoplay, autoplayInterval]);
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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