"use client";

import { Media } from '../types';
import { useEffect, useCallback } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import { useMediaStore } from '@/features/media/store/mediaStore';

import {   
  HeroSection, 
  PosterModal, 
  StreamingProviders, 
  CastSection, 
  TrailersSection, 
  GallerySection,
  ReviewSection,
} from '@/features/media/components';

interface MediaPageProps {
  media: Media;
}

/**
 * Página de media
 * @param {MediaPageProps} props - Propiedades de la página
 * @returns {JSX.Element} Página de media
 */
export const MediaPage = ({ media }: MediaPageProps) => {
  const tmdbId = Number(media.id);
  const itemType = media.tipo === 'pelicula' ? 'movie' : 'series';

  /**
   * Estado y acciones del store
   * @type {Object}
   * @property {boolean} showPosterModal - Indica si el modal de la imagen está abierto
   * @property {() => void} setShowPosterModal - Función que se ejecuta al cerrar el modal de la imagen
   * @property {Review[]} reviews - Lista de reseñas
   * @property {boolean} loadingReviews - Indica si se está cargando las reseñas
   * @property {string | null} errorReviews - Indica si hay un error en las reseñas
   * @property {() => void} setReviews - Función que se ejecuta al actualizar las reseñas
   */
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

  /**
   * Función que actualiza las reseñas
   * @returns {void}
   * @description Función que actualiza las reseñas
   */
  const refreshReviews = useCallback(() => {
    setLoadingReviews(true);
    setErrorReviews(null);
    reviewsAPI.getByMedia(tmdbId, itemType)
      .then(data => {
        setReviews(data);
      })
      .catch(() => setErrorReviews('No se pudieron cargar las reseñas.'))
      .finally(() => setLoadingReviews(false));
  }, [tmdbId, itemType, setReviews, setLoadingReviews, setErrorReviews]);

  /**
   * Efecto que actualiza las reseñas
   * @description Efecto que actualiza las reseñas
   */
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