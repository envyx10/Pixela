'use client';

import Image from "next/image";
import clsx from 'clsx';
import { useHeroStore } from "../store";

const STYLES = {
  carousel: {
    base: "absolute inset-0 w-full h-full",
    imageContainer: {
      base: "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out",
      fadeIn: "opacity-100",
      fadeOut: "opacity-0"
    }
  },
  overlays: {
    base: "absolute inset-0",
    darkOverlay: "bg-pixela-dark/300",
    gradientOverlay: "bg-gradient-to-t from-pixela-dark/90 via-pixela-dark/50 to-pixela-dark/80",
    topGradient: "absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pixela-dark via-pixela-dark/50 to-transparent",
    bottomGradient: "absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-pixela-dark via-pixela-dark/50 to-transparent"
  },
  image: {
    container: "relative w-full h-full pt-16",
    base: "w-full h-full object-cover brightness-90 contrast-100 grayscale"
  }
} as const;

/**
 * Props para el componente ImageCarousel
 * @property {string[]} images - Array de URLs de imágenes para el carrusel
 */
interface ImageCarouselProps {
  images: string[];
}

/**
 * Componente que maneja los overlays visuales del carrusel
 * Incluye gradientes y efectos de oscurecimiento
 */
const VisualOverlays = () => (
  <>
    <div className={clsx(STYLES.overlays.base, STYLES.overlays.darkOverlay)} />
    <div className={clsx(STYLES.overlays.base, STYLES.overlays.gradientOverlay)} />
    <div className={STYLES.overlays.topGradient} />
    <div className={STYLES.overlays.topGradient} />
    <div className={STYLES.overlays.bottomGradient} />
  </>
);

/**
 * Componente que renderiza una imagen optimizada para el carrusel
 */
const OptimizedHeroImage = ({ 
  src, 
  index 
}: { 
  src: string; 
  index: number;
}) => (
  <div className={STYLES.image.container}>
    <Image
      src={src}
      alt={`Hero background image ${index + 1}`}
      className={STYLES.image.base}
      style={{ objectPosition: 'center 35%' }}
      width={1920}
      height={1080}
      priority
      quality={90}
      sizes="100vw"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7ygAAAABJRU5ErkJggg=="
    />
  </div>
);

/**
 * Componente que muestra un carrusel de imágenes con efectos visuales
 * y optimizaciones de rendimiento para el hero de la página
 */
export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const { currentImageIndex, fadeIn } = useHeroStore();

  return (
    <div className={STYLES.carousel.base}>
      <div
        className={clsx(
          STYLES.carousel.imageContainer.base,
          fadeIn ? STYLES.carousel.imageContainer.fadeIn : STYLES.carousel.imageContainer.fadeOut
        )}
        aria-hidden="true"
        role="presentation"
      >
        <OptimizedHeroImage 
          src={images[currentImageIndex]} 
          index={currentImageIndex} 
        />
      </div>
      <VisualOverlays />
    </div>
  );
};