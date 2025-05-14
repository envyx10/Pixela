"use client";

import { Media } from '../types';
import { useState, useEffect, useCallback } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import { Review } from '@/api/reviews/types';

import {   
  HeroSection, 
  PosterModal, 
  StreamingProviders, 
  CastSection, 
  TrailersSection, 
  GallerySection,
  ReviewSection,
} from '../components';

interface MediaPageProps {
  media: Media;
}

export const MediaPage = ({ media }: MediaPageProps) => {
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState<string | null>(null);

  const tmdbId = Number(media.id);
  const itemType = media.tipo === 'pelicula' ? 'movie' : 'series';

  const refreshReviews = useCallback(() => {
    setLoadingReviews(true);
    setErrorReviews(null);
    reviewsAPI.list()
      .then(data => {
        setReviews(data.filter(r => r.tmdb_id === tmdbId && r.item_type === itemType));
      })
      .catch(() => setErrorReviews('No se pudieron cargar las reseñas.'))
      .finally(() => setLoadingReviews(false));
  }, [tmdbId, itemType]);

  useEffect(() => {
    refreshReviews();
  }, [refreshReviews]);

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section */}
      <HeroSection 
        media={media} 
        onPosterClick={() => setShowPosterModal(true)} 
        title={media.titulo}
        refreshReviews={refreshReviews}
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
          {/* Reseñas */}
          <ReviewSection 
            tmdbId={tmdbId} 
            itemType={itemType}
            reviews={reviews}
            loading={loadingReviews}
            error={errorReviews}
            refreshReviews={refreshReviews}
          />
        </div>
      </div>
    </div>
  );
}; 