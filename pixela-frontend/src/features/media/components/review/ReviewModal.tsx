import { useState } from 'react';
import { FiX, FiStar } from 'react-icons/fi';
import { reviewsAPI } from '@/api/reviews/reviews';
import { CreateReview } from '@/api/reviews/types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tmdbId: number;
  itemType: 'movie' | 'series';
  title: string;
  refreshReviews?: () => void;
}

// Utilidad para renderizar medias estrellas
const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => (
  <span className="relative inline-block w-6 h-6">
    <FiStar className={`w-6 h-6 absolute top-0 left-0 ${filled ? 'text-yellow-400' : 'text-gray-400'}`} />
    {half && (
      <FiStar
        className="w-6 h-6 absolute top-0 left-0 text-yellow-400"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
      />
    )}
  </span>
);

export const ReviewModal = ({ isOpen, onClose, tmdbId, itemType, title, refreshReviews }: ReviewModalProps) => {
  // Default: 3 estrellas (6/10)
  const [rating, setRating] = useState(6);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // rating: 1-10 (permite decimales de 0.5)
  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    const value = isHalf ? starIndex * 2 - 1 : starIndex * 2;
    setRating(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData: CreateReview = {
        tmdb_id: tmdbId,
        item_type: itemType,
        rating,
        review
      };
      await reviewsAPI.add(reviewData);
      onClose();
      if (refreshReviews) refreshReviews();

    } catch (error: any) {
      let errorMsg = 'No se pudo guardar la reseña. Por favor, inténtalo de nuevo.';
      console.log(error);

      if (typeof error?.message === 'string' && error.message.includes('Review already exists')) {
        errorMsg = 'El usuario ya tiene una reseña para esta ficha.';
      }
      setError(errorMsg);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-xl w-full max-w-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Escribir Reseña</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Puntuación
              </label>
              <div className="flex items-center gap-2">
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
                        className="absolute left-0 top-0 w-1/2 h-full z-10"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStarClick(star, true)}
                      />
                      {/* Estrella completa (derecha) */}
                      <button
                        type="button"
                        aria-label={`Puntuar con ${star} estrellas`}
                        className="absolute right-0 top-0 w-1/2 h-full z-10"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleStarClick(star, false)}
                      />
                      <Star filled={isFull} half={isHalf} />
                    </span>
                  );
                })}
                <span className="ml-4 text-gray-400 text-sm">{rating % 1 === 0 ? rating : rating.toFixed(1)}/10</span>
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reseña
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-32 bg-[#252525] border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent transition-colors resize-none"
                placeholder="Escribe tu opinión sobre esta película o serie..."
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-pixela-accent hover:bg-pixela-accent/90 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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