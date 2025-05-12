"use client";

import { Wallpaper } from '../../types/gallery';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryGridProps {
  images: Wallpaper[];
  type: 'backdrops' | 'posters';
  onImageClick: (image: Wallpaper) => void;
  showAll?: boolean;
}

export function GalleryGrid({ images, type, onImageClick, showAll = false }: GalleryGridProps) { 
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({
      ...prev,
      [imagePath]: true
    }));
  };

  if (images.length === 0) {
    return (
      <div className="py-6 flex justify-center">
        <p className="text-gray-400">No hay imágenes disponibles</p>
      </div>
    );
  }

  // Mostrar solo las primeras 4 si no está expandido
  const imagesToShow = showAll ? images : images.slice(0, 6);

  return (
    <div className={`grid gap-4 ${type === 'backdrops' 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'}`}
    >
      {imagesToShow.map((image, index) => {
        // Saltar imágenes que fallaron al cargar
        if (imageErrors[image.file_path]) {
          return null;
        }

        return (
          <div 
            key={image.file_path || index}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => onImageClick(image)}
          >
            <div className={`relative w-full ${type === 'backdrops' 
              ? 'aspect-video' 
              : 'aspect-[2/3]'}`}
            >
              <Image
                src={image.file_path}
                alt={`${type === 'backdrops' ? 'Backdrop' : 'Poster'} ${index + 1}`}
                fill
                sizes={type === 'backdrops' 
                  ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                  : "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => handleImageError(image.file_path)}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Ver</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 