'use client';

import Image from "next/image";
import clsx from 'clsx';
import { useHeroStore } from "../store/heroStore";

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
    topGradient: "absolute top-0 left-0 w-full h-32 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-b from-pixela-dark via-pixela-dark/50 to-transparent",
    bottomGradient: "absolute bottom-0 left-0 w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-t from-pixela-dark via-pixela-dark/50 to-transparent"
  },
  image: {
    container: "relative w-full h-full lg:pt-16",
    base: "w-full h-full object-cover grayscale"
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
}) => {
  return (
    <div className={STYLES.image.container}>
      <Image
        src={src}
        alt={`Hero background image ${index + 1}`}
        className={STYLES.image.base}
        // Usar cálculos CSS modernos para posicionamiento de la imagen
        style={{
          objectPosition: "center 30%", // Posición equilibrada que funciona bien en la mayoría de dispositivos
          objectFit: "cover"
        }}
        // Dimensiones más grandes para soportar pantallas de alta densidad
        width={3000}
        height={2000}
        priority={true}
        // Calidad máxima, crucial para dispositivos de alta densidad
        quality={100}
        // Configuración precisa para cada dimensión específica
        sizes="(max-width: 393px) 393px, (max-width: 430px) 430px, (max-width: 478px) 478px, (max-width: 820px) 820px, (max-width: 1024px) 1024px, 1920px"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEDQIHq4C7ygAAAABJRU5ErkJggg=="
        loading="eager"
        unoptimized={false}
      />
    </div>
  );
};

/**
 * Componente que muestra un carrusel de imágenes con efectos visuales
 * y optimizaciones de rendimiento para el hero de la página
 */
export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const { currentImageIndex, fadeIn } = useHeroStore();

  // En caso de que no haya imágenes
  if (!images || images.length === 0 || !images[currentImageIndex]) {
    return (
      <div className={STYLES.carousel.base}>
        <div className={clsx(STYLES.carousel.imageContainer.base, STYLES.carousel.imageContainer.fadeIn)}>
          <div className="w-full h-full bg-pixela-dark" />
        </div>
        <VisualOverlays />
      </div>
    );
  }

  // Obtener la imagen de mayor calidad
  const optimizedSrc = images[currentImageIndex];

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
          src={optimizedSrc} 
          index={currentImageIndex} 
        />
      </div>
      <VisualOverlays />
    </div>
  );
};