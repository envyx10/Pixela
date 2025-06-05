"use client";

import { Media } from '../types';
import { useEffect, useCallback } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import { useMediaStore } from '../store/mediaStore';

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
  const tmdbId = Number(media.id);
  const itemType = media.tipo === 'pelicula' ? 'movie' : 'series';

  // Obtener estado y acciones del store
  const {
    showPosterModal,
    setShowPosterModal,
    reviews,
    loadingReviews,
    errorReviews,
    setReviews,
    setLoadingReviews,
    setErrorReviews
  } = useMediaStore();

  const refreshReviews = useCallback(() => {
    setLoadingReviews(true);
    setErrorReviews(null);
    reviewsAPI.list()
      .then(data => {
        setReviews(data.filter(r => r.tmdb_id === tmdbId && r.item_type === itemType));
      })
      .catch(() => setErrorReviews('No se pudieron cargar las reseñas.'))
      .finally(() => setLoadingReviews(false));
  }, [tmdbId, itemType, setReviews, setLoadingReviews, setErrorReviews]);

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
      <div className="relative z-10 pb-40 -mt-20">
        <div className="container px-4 pt-8 mx-auto md:pt-0">
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