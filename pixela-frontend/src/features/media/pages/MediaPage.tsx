"use client";

import { Media } from '../types';
import { useState } from 'react';

import { 
  HeroSection, 
  PosterModal, 
  StreamingProviders, 
  CastSection, 
  TrailersSection, 
  GallerySection, 
  ImageModal 
} from '../components';

interface MediaPageProps {
  media: Media;
}

export const MediaPage = ({ media }: MediaPageProps) => {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);

  return (

    <div className="min-h-screen bg-[#0F0F0F]">
      
      {/* Hero Section */}
      <HeroSection 
        media={media} 
        onPosterClick={() => setShowPosterModal(true)} 
      />

      {/* Poster Modal */}
      <PosterModal 
        isOpen={showPosterModal} 
        onClose={() => setShowPosterModal(false)} 
        posterUrl={media.poster} 
        title={media.titulo} 
      />

      {/* Image Modal */}
      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageUrl={selectedImage} 
      />

      {/* Content Sections */}
      <div className="relative z-10 -mt-20">
        <div className="container mx-auto px-4">
          {/* Proveedores de Streaming */}
          <StreamingProviders providers={media.proveedores || []} />
          {/* Reparto */}
          <CastSection actors={media.actores} />
          {/* Trailers */}
          <TrailersSection trailers={media.trailers} />
          {/* Galería de Imágenes */}
          <GallerySection 
            images={media.imagenes || []} 
            mediaTitle={media.titulo}
            onImageClick={setSelectedImage}
          />
        </div>
      </div>
    </div>
  );
}; 