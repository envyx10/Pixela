"use client";

import { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import { reviewsAPI } from '@/api/reviews/reviews';
import { CreateReview } from '@/api/reviews/types';
import { ReviewModalProps } from '@/features/media/types/reviews';

const STYLES = {
  // Estilos del modal y overlay
  modal: {
    overlay: "fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4",
    container: "bg-[#1A1A1A] rounded-xl w-full max-w-2xl border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto relative"
  },
  // Estilos del header
  header: {
    container: "sticky top-0 bg-[#1A1A1A] flex items-center justify-between p-6 border-b border-white/10 z-10",
    title: "text-xl font-semibold text-white",
    closeButton: "text-gray-400 transition-colors hover:text-white"
  },
  // Estilos del contenido
  content: {
    container: "p-6",
    title: "mb-2 text-lg font-medium text-white",
    rating: {
      label: "block mb-2 text-sm font-medium text-gray-300",
      container: "flex items-center gap-2",
      value: "ml-4 text-sm text-gray-400"
    },
    review: {
      label: "block mb-2 text-sm font-medium text-gray-300",
      textarea: "w-full h-32 bg-[#252525] border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent transition-colors resize-none"
    },
    error: "p-3 mb-4 text-sm text-red-400 border rounded-lg bg-red-500/10 border-red-500/20",
    success: "p-3 mb-4 text-sm text-green-400 border rounded-lg bg-green-500/10 border-green-500/20",
    submit: {
      container: "flex justify-end",
      button: "flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors rounded-lg bg-pixela-accent hover:bg-pixela-accent/90 disabled:opacity-50 disabled:cursor-not-allowed",
      spinner: "w-5 h-5 border-2 rounded-full border-white/20 border-t-white animate-spin"
    }
  }
} as const;

/**
 * Componente que muestra la estrella de la reseña
 * @param {boolean} filled - Indica si la estrella está llena
 * @param {boolean} half - Indica si la estrella está media llena
 * @returns {JSX.Element} Componente de estrella de la reseña
 */
const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <span className="relative inline-block w-6 h-6">
    <FiStar className={`w-6 h-6 absolute top-0 left-0 ${filled ? 'text-yellow-400' : 'text-gray-400'}`} />
    {half && (
      <FiStar
        className="absolute top-0 left-0 w-6 h-6 text-yellow-400"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      />
    )}
  </span>
);

/**
 * Componente que muestra el modal de reseña
 * @param {ReviewModalProps} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está abierto
 * @param {() => void} props.onClose - Función que se ejecuta al cerrar el modal
 * @param {number} props.tmdbId - ID de la película o serie en TMDB
 * @param {'movie' | 'series'} props.itemType - Tipo de película o serie
 * @param {string} props.title - Título de la película o serie
 * @param {() => void} [props.refreshReviews] - Función que se ejecuta al actualizar las reseñas
 * @returns {JSX.Element} Componente de modal de reseña
 */
export const ReviewModal = ({ isOpen, onClose, tmdbId, itemType, title, refreshReviews }: ReviewModalProps) => {
  // Default: 3 estrellas (6/10)
  const [rating, setRating] = useState(6);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  /**
   * Función que se ejecuta al hacer clic en una estrella
   * @param {number} starIndex - Índice de la estrella
   * @param {boolean} isHalf - Indica si la estrella está media llena
   * @returns {void}
   */
  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    const value = isHalf ? starIndex * 2 - 1 : starIndex * 2;
    setRating(value);
  };

  /**
   * Función que se ejecuta al hacer clic en el botón de enviar
   * @param {React.FormEvent} e - Evento de formulario
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const reviewData: CreateReview = {
        tmdb_id: tmdbId,
        item_type: itemType,
        rating,
        review
      };
      await reviewsAPI.add(reviewData);
      
      // Mostrar mensaje de éxito
      setSuccess('¡Reseña creada correctamente!');
      
      // Esperar un poco para que el usuario vea el mensaje antes de cerrar
      setTimeout(() => {
        onClose();
        if (refreshReviews) refreshReviews();
      }, 1500);

    } catch (error: unknown) {
      let errorMsg = 'No se pudo guardar la reseña. Por favor, inténtalo de nuevo.';
      console.log(error);

      if (error instanceof Error && error.message.includes('Review already exists')) {
        errorMsg = 'El usuario ya tiene una reseña para esta ficha.';
      }
      setError(errorMsg);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={STYLES.modal.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className={STYLES.modal.container}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={STYLES.header.container}>
          <h2 className={STYLES.header.title}>Escribir Reseña</h2>
          <button
            onClick={onClose}
            className={STYLES.header.closeButton}
            type="button"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className={STYLES.content.container}>
          <div className="mb-6">
            <h3 className={STYLES.content.title}>{title}</h3>
            
            {/* Rating */}
            <div className="mb-4">
              <label className={STYLES.content.rating.label}>
                Puntuación
              </label>
              <div className={STYLES.content.rating.container}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const starValue = star * 2;
                  const isFull = rating >= starValue;
                  const isHalf = rating === starValue - 1;
                  return (
                    <span key={star} className="relative group">
                      {/* Media estrella (izquierda) */}
                      <button
                        type="button"
                        aria-label={`Puntuar con ${star - 0.5} estrellas`}
                        className="absolute top-0 left-0 z-10 w-1/2 h-full"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStarClick(star, true)}
                      />
                      {/* Estrella completa (derecha) */}
                      <button
                        type="button"
                        aria-label={`Puntuar con ${star} estrellas`}
                        className="absolute top-0 right-0 z-10 w-1/2 h-full"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStarClick(star, false)}
                      />
                      <Star filled={isFull} half={isHalf} />
                    </span>
                  );
                })}
                <span className={STYLES.content.rating.value}>
                  {rating % 1 === 0 ? rating : rating.toFixed(1)}/10
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className={STYLES.content.review.label}>
                Reseña
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className={STYLES.content.review.textarea}
                placeholder="Escribe tu opinión sobre esta película o serie..."
                required
              />
            </div>

            {error && (
              <div className={STYLES.content.error}>
                {error}
              </div>
            )}

            {success && (
              <div className={STYLES.content.success}>
                {success}
              </div>
            )}

            {/* Submit Button */}
            <div className={STYLES.content.submit.container}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={STYLES.content.submit.button}
              >
                {isSubmitting ? (
                  <>
                    <div className={STYLES.content.submit.spinner} />
                    Guardando...
                  </>
                ) : (
                  'Publicar Reseña'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 