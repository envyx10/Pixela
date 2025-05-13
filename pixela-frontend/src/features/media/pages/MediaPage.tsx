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
} from '../components';

interface MediaPageProps {
  media: Media;
}

export const MediaPage = ({ media }: MediaPageProps) => {

  const [showPosterModal, setShowPosterModal] = useState(false);

  return (

    <div className="min-h-screen bg-[#0F0F0F]">
      
      {/* Hero Section */}
      <HeroSection 
        media={media} 
        onPosterClick={() => setShowPosterModal(true)} 
        title={media.titulo}
      />

      {/* Poster Modal */}
      <PosterModal 
        isOpen={showPosterModal} 
        onClose={() => setShowPosterModal(false)} 
        posterUrl={media.poster} 
        title={media.titulo} 
      />

      {/* Content Sections */}
      <div className="relative z-10 -mt-20 pb-40">
        <div className="container mx-auto px-4">
          {/* Proveedores de Streaming */}
          <StreamingProviders 
            providers={media.proveedores || []}
          />
          {/* Reparto */}
          <CastSection actors={media.actores} />
          {/* Trailers */}
          <TrailersSection trailers={media.trailers} />
          {/* Galería */}
          <GallerySection media={media} />
        </div>
      </div>
    </div>
  );
}; 