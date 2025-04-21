'use client';

import Image from "next/image";
import clsx from 'clsx';
import { useHeroStore } from "../store";

interface ImageCarouselProps {
  images: string[];
}

const VisualOverlays = () => (
  <>
    <div className="absolute inset-0 bg-pixela-dark/300" />
    <div className="absolute inset-0 bg-gradient-to-t from-pixela-dark/90 via-pixela-dark/50 to-pixela-dark/80" />
    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pixela-dark via-pixela-dark/50 to-transparent" />
    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pixela-dark via-pixela-dark/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-pixela-dark via-pixela-dark/50 to-transparent"></div>
  </>
);


export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const { currentImageIndex, fadeIn } = useHeroStore();

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Imagen de fondo con transición */}
      <div
        className={clsx(
          "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out",
          fadeIn ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
        role="presentation"
      >
        <Image
          src={images[currentImageIndex]}
          alt={`Hero background image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover brightness-90 contrast-100 grayscale"
          width={1920}
          height={1080}
          priority
        />
      </div>

      {/* Capas visuales */}
      <VisualOverlays />
    </div>
  );
};
