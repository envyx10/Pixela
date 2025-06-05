"use client";

import { Media } from '../../types';
import { Wallpaper } from '../../types/gallery';
import { getMediaImages } from '../../services/galleryService';
import { GalleryGrid } from './GalleryGrid';
import { GalleryTabs } from './GalleryTabs';
import { useMediaStore } from '../../store/mediaStore';
import { useState, useEffect } from 'react';

interface GallerySectionProps {
  media: Media;
}

export function GallerySection({ media }: GallerySectionProps) {
  const [images, setImages] = useState<{ backdrops: Wallpaper[], posters: Wallpaper[] }>({
    backdrops: [],
    posters: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const {
    activeGalleryTab,
    setActiveGalleryTab,
    selectedGalleryImage,
    setSelectedGalleryImage
  } = useMediaStore();

  // Renderizar el componente solo en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cargar imágenes al montar el componente
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mediaType = media.tipo === 'pelicula' ? 'movie' : 'series';
        console.log(`[DEBUG] GallerySection - Fetching images for ${mediaType} with ID ${media.id}`);
        
        const imagesData = await getMediaImages(media.id, mediaType);
        
        // Si hay imágenes, establecerlas
        if (imagesData.backdrops.length > 0 || imagesData.posters.length > 0) {
          console.log(`[DEBUG] GallerySection - Received ${imagesData.backdrops.length} backdrops and ${imagesData.posters.length} posters`);
          setImages({
            backdrops: imagesData.backdrops || [],
            posters: imagesData.posters || []
          });
        } else if (retryCount < 1) {
          console.log('[DEBUG] GallerySection - No images found, will retry');
          setRetryCount(prev => prev + 1);
        
        } else {
          console.warn('[WARN] GallerySection - No images found after retry');
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('No se pudieron cargar las imágenes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [media.id, media.tipo, isMounted, retryCount]);

  // No renderizar nada en el servidor o antes de montar
  if (!isMounted) {
    return null;
  }

  // Si no hay imágenes y no estamos cargando, no renderizar el componente
  const hasImages = images.backdrops.length > 0 || images.posters.length > 0;
  
  if (isLoading) {
    return (
      <div className="mt-12 mb-12">
        <h2 className="text-2xl font-bold text-white mb-5">Galería</h2>
        <div className="flex justify-center py-10">
          <div className="animate-pulse flex space-x-4">
            <div className="h-48 w-full bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasImages) {
    return null;
  }

  return (
    <div className="mt-12 mb-24">
      <h2 className="text-2xl font-bold text-white mb-5">Galería</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      <GalleryTabs 
        activeTab={activeGalleryTab}
        onTabChange={tab => {
          setActiveGalleryTab(tab);
          setShowAll(false);
        }}
        backdropsCount={images.backdrops.length}
        postersCount={images.posters.length}
      />
      
      <div className="mt-6">
        <GalleryGrid
          images={activeGalleryTab === 'backdrops' ? images.backdrops : images.posters}
          type={activeGalleryTab}
          onImageClick={(image) => setSelectedGalleryImage(image.file_path)}
          showAll={showAll}
        />
        {(images[activeGalleryTab].length > 4) && (
          <div className="flex justify-start mt-4">
            <button
              className="px-5 py-2 rounded-lg font-semibold bg-pixela-accent hover:bg-pixela-accent-dark text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pixela-accent-dark focus:ring-offset-2"
              onClick={() => setShowAll(v => !v)}
            >
              {showAll ? 'Mostrar menos' : `Mostrar todos los ${activeGalleryTab === 'backdrops' ? 'fondos' : 'pósters'}`}
            </button>
          </div>
        )}
      </div>
      
      {selectedGalleryImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedGalleryImage} 
              alt="Preview"
              className="max-h-[90vh] max-w-full object-contain" 
            />
            <button
              className="absolute -top-10 right-0 text-white hover:text-pixela-accent"
              onClick={() => setSelectedGalleryImage(null)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 