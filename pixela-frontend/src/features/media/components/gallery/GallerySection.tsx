"use client";

import { useState, useEffect } from 'react';
import { Media } from '../../types';
import { Wallpaper } from '../../types/gallery';
import { getMediaImages } from '../../services/galleryService';
import { GalleryGrid } from './GalleryGrid';
import { GalleryTabs } from './GalleryTabs';

interface GallerySectionProps {
  media: Media;
}

export function GallerySection({ media }: GallerySectionProps) {
  const [images, setImages] = useState<{ backdrops: Wallpaper[], posters: Wallpaper[] }>({
    backdrops: [],
    posters: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'backdrops' | 'posters'>('backdrops');
  const [selectedImage, setSelectedImage] = useState<Wallpaper | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showAll, setShowAll] = useState(false);

  // Handle client-side only rendering to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load images on component mount
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const mediaType = media.tipo === 'pelicula' ? 'movie' : 'series';
        console.log(`[DEBUG] GallerySection - Fetching images for ${mediaType} with ID ${media.id}`);
        
        const imagesData = await getMediaImages(media.id, mediaType);
        
        // If we have images, set them
        if (imagesData.backdrops.length > 0 || imagesData.posters.length > 0) {
          console.log(`[DEBUG] GallerySection - Received ${imagesData.backdrops.length} backdrops and ${imagesData.posters.length} posters`);
          setImages({
            backdrops: imagesData.backdrops || [],
            posters: imagesData.posters || []
          });
        } else if (retryCount < 1) {
          // If no images were found and we haven't retried yet, retry once
          console.log('[DEBUG] GallerySection - No images found, will retry');
          setRetryCount(prev => prev + 1);
          // We'll try again on the next run of the effect due to retryCount changing
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

  // Don't render anything on server side or before mounting
  if (!isMounted) {
    return null;
  }

  // If there are no images and we're not loading, don't render the component
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
    // If we have no images and we're not loading anymore, don't render the component
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
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          setShowAll(false); // Al cambiar de tab, colapsa la galería
        }}
        backdropsCount={images.backdrops.length}
        postersCount={images.posters.length}
      />
      
      <div className="mt-6">
        <GalleryGrid
          images={activeTab === 'backdrops' ? images.backdrops : images.posters}
          type={activeTab}
          onImageClick={setSelectedImage}
          showAll={showAll}
        />
        {(images[activeTab].length > 4) && (
          <div className="flex justify-center mt-4">
            <button
              className="px-5 py-2 rounded-lg font-semibold bg-pixela-accent hover:bg-pixela-accent-dark text-white shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pixela-accent-dark focus:ring-offset-2"
              onClick={() => setShowAll(v => !v)}
            >
              {showAll ? 'Mostrar menos' : `Mostrar todos los ${activeTab === 'backdrops' ? 'fondos' : 'pósters'}`}
            </button>
          </div>
        )}
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <button
              className="absolute -top-10 right-0 text-white hover:text-pixela-accent"
              onClick={() => setSelectedImage(null)}
            >
              Cerrar
            </button>
            <img 
              src={selectedImage.file_path} 
              alt="Preview"
              className="max-h-[90vh] max-w-full object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
} 