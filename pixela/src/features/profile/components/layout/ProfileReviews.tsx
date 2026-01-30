import { useEffect, useState } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import type { Review } from '@/api/reviews/types';
import { FiLoader, FiAlertCircle, FiStar, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { StarEditProps } from '@/features/profile/types/layout';

/**
 * URL base para las imágenes de TMDB
 */
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Mensajes de error constantes
 */
const ERROR_MESSAGES = {
  LOAD: 'No se pudieron cargar las reseñas.',
  DELETE: 'No se pudo eliminar la reseña',
  UPDATE: 'No se pudo actualizar la reseña'
} as const;

/**
 * Estilos constantes para el componente ProfileReviews
 */
const STYLES = {
  container: '[&_.content-panel__content]:!block space-y-2',
  loadingContainer: 'flex items-center justify-center p-8',
  loadingIcon: 'w-8 h-8 text-pixela-primary animate-spin',
  errorContainer: 'flex items-center justify-center p-8 text-red-500',
  errorIcon: 'w-6 h-6 mr-2',
  emptyContainer: 'flex flex-col items-center justify-center p-8 text-gray-400',
  emptyIcon: 'w-12 h-12 mb-4',
  emptyText: 'text-lg font-outfit',
  reviewItem: clsx(
    'flex items-center bg-pixela-dark-opacity/50',
    'hover:bg-pixela-dark-opacity/70 transition-all duration-300 -mr-6'
  ),
  posterContainer: 'relative w-[100px] h-[150px] flex-shrink-0 group',
  posterImage: 'object-cover cursor-pointer transition-all duration-300 group-hover:scale-105',
  posterOverlay: clsx(
    'absolute inset-0 bg-black/60 opacity-0',
    'group-hover:opacity-100 transition-opacity duration-300',
    'flex items-center justify-center'
  ),
  overlayText: 'text-white text-sm font-medium',
  noImageContainer: 'w-full h-full flex items-center justify-center bg-pixela-dark text-gray-500 text-sm text-center px-2',
  infoContainer: 'flex flex-grow items-center justify-between pl-6 pr-8 py-4',
  contentContainer: 'flex flex-col gap-1 w-full',
  titleContainer: 'flex items-center gap-2',
  title: 'text-lg font-semibold text-white font-outfit',
  rating: 'flex items-center text-yellow-400 ml-2',
  ratingIcon: 'w-4 h-4 mr-1',
  reviewText: 'text-gray-300 text-sm mt-1',
  date: 'text-xs text-gray-400 mt-1',
  actionsContainer: 'flex items-center -ml-2',
  actionButton: clsx(
    'p-3 text-gray-400 hover:text-[#ec1b69]',
    'transition-colors duration-200'
  ),
  actionIcon: 'w-5 h-5',
  editContainer: 'flex flex-col gap-2 mt-1',
  textarea: clsx(
    'w-full rounded bg-[#181818]',
    'border border-gray-600 text-white p-2',
    'resize-none'
  ),
  editActions: 'flex gap-2 mt-1',
  editButton: clsx(
    'p-2 text-gray-400 hover:text-[#ec1b69]',
    'transition-colors duration-200'
  ),
  saveIcon: 'w-5 h-5 text-green-500 hover:text-green-400 transition-colors duration-200'
} as const;



/**
 * Componente para mostrar y editar medias estrellas
 * @param {StarEditProps} props - Props del componente
 * @returns {JSX.Element} Componente StarEdit
 */
const StarEdit = ({ value, onChange, disabled }: StarEditProps) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => {
      const starValue = star * 2;
      const isFull = value >= starValue;
      const isHalf = value === starValue - 1;
      return (
        <span key={star} className="relative w-6 h-6 group">
          <button
            type="button"
            aria-label={`Puntuar con ${star - 0.5} estrellas`}
            className={clsx(
              "absolute top-0 left-0 z-10 w-1/2 h-full",
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={() => !disabled && onChange(star * 2 - 1)}
            disabled={disabled}
          />
          <button
            type="button"
            aria-label={`Puntuar con ${star} estrellas`}
            className={clsx(
              "absolute top-0 right-0 z-10 w-1/2 h-full",
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            )}
            onClick={() => !disabled && onChange(star * 2)}
            disabled={disabled}
          />
          <span className="relative inline-block w-6 h-6">
            <FiStar className={`w-6 h-6 absolute top-0 left-0 ${isFull ? 'text-yellow-400' : 'text-gray-400'}`} />
            {isHalf && (
              <FiStar
                className="absolute top-0 left-0 w-6 h-6 text-yellow-400"
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            )}
          </span>
        </span>
      );
    })}
    <span className="ml-2 text-xs text-yellow-400">{(value / 2) % 1 === 0 ? (value / 2) : (value / 2).toFixed(1)}/5</span>
  </div>
);

/**
 * Componente que muestra la lista de reseñas del usuario
 * @returns {JSX.Element} Componente ProfileReviews
 */
export const ProfileReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(5);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    reviewsAPI.list()
      .then(setReviews)
      .catch(() => setError(ERROR_MESSAGES.LOAD))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Maneja la eliminación de una reseña
   * @param {number} reviewId - ID de la reseña a eliminar
   */
  const handleDelete = async (reviewId: number) => {
    setDeletingId(reviewId);
    try {
      await reviewsAPI.delete(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch {
      setError(ERROR_MESSAGES.DELETE);
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * Inicia la edición de una reseña
   * @param {Review} review - Reseña a editar
   */
  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.review);
    setEditRating(Number(review.rating));
  };

  /**
   * Cancela la edición de una reseña
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(5);
  };

  /**
   * Guarda los cambios de una reseña
   * @param {Review} review - Reseña a actualizar
   */
  const handleSaveEdit = async (review: Review) => {
    setSavingId(review.id);
    try {
      await reviewsAPI.update({
        ...review,
        review: editText,
        rating: editRating
      });
      const updatedReviews = await reviewsAPI.list();
      setReviews(updatedReviews);
      setEditingId(null);
      setEditText('');
      setEditRating(5);
    } catch {
      setError(ERROR_MESSAGES.UPDATE);
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className={STYLES.loadingContainer}>
        <FiLoader className={STYLES.loadingIcon} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={STYLES.errorContainer}>
        <FiAlertCircle className={STYLES.errorIcon} />
        <span>{error}</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={STYLES.emptyContainer}>
        <FiAlertCircle className={STYLES.emptyIcon} />
        <p className={STYLES.emptyText}>No hay reseñas.</p>
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      {reviews.map((review) => (
        <div key={review.id} className={STYLES.reviewItem}>
          <div className={STYLES.posterContainer}>
            <Link 
              href={`/${review.item_type === 'movie' ? 'movies' : 'series'}/${review.tmdb_id}`}
              className="block w-full h-full"
            >
              {review.poster_path ? (
                <>
                  <Image
                    src={`${TMDB_IMAGE_BASE_URL}${review.poster_path}`}
                    alt={review.title || (review.item_type === 'movie' ? 'Película' : 'Serie')}
                    fill
                    className={STYLES.posterImage}
                    sizes="100px"
                  />
                  <div className={STYLES.posterOverlay}>
                    <span className={STYLES.overlayText}>Ver detalles</span>
                  </div>
                </>
              ) : (
                <div className={STYLES.noImageContainer}>
                  Sin imagen
                </div>
              )}
            </Link>
          </div>

          <div className={STYLES.infoContainer}>
            <div className={STYLES.contentContainer}>
              <div className={STYLES.titleContainer}>
                <Link 
                  href={`/${review.item_type === 'movie' ? 'movies' : 'series'}/${review.tmdb_id}`}
                  className="hover:text-pixela-accent transition-colors"
                >
                  <span className={STYLES.title}>
                    {review.title || `${review.item_type === 'movie' ? 'Película' : 'Serie'} #${review.tmdb_id}`}
                  </span>
                </Link>
                <span className={STYLES.rating}>
                  {editingId !== review.id && (
                    <FiStar className={STYLES.ratingIcon} />
                  )}
                  {editingId === review.id
                    ? (
                      <StarEdit
                        value={editRating}
                        onChange={setEditRating}
                        disabled={savingId === review.id}
                      />
                    )
                    : Number(review.rating) % 1 === 0
                      ? (Number(review.rating) / 2)
                      : (Number(review.rating) / 2).toFixed(1)
                  }
                </span>
              </div>
              {editingId === review.id ? (
                <div className={STYLES.editContainer}>
                  <textarea
                    className={STYLES.textarea}
                    rows={3}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    disabled={savingId === review.id}
                    placeholder="Escribe tu reseña aquí..."
                    aria-label="Editar reseña"
                  />
                  <div className={STYLES.editActions}>
                    <button
                      className={STYLES.editButton}
                      title="Guardar"
                      onClick={() => handleSaveEdit(review)}
                      disabled={savingId === review.id}
                    >
                      {savingId === review.id ? (
                        <FiLoader className={STYLES.actionIcon} />
                      ) : (
                        <FiCheck className={STYLES.saveIcon} />
                      )}
                    </button>
                    <button
                      className={STYLES.editButton}
                      title="Cancelar"
                      onClick={handleCancelEdit}
                      disabled={savingId === review.id}
                    >
                      <FiX className={STYLES.actionIcon} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className={STYLES.reviewText}>{review.review}</p>
              )}
              <span className={STYLES.date}>
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
              </span>
              <div className={STYLES.actionsContainer}>
                {editingId !== review.id && (
                  <button
                    className={STYLES.actionButton}
                    title="Editar reseña"
                    onClick={() => handleEdit(review)}
                  >
                    <FiEdit className={STYLES.actionIcon} />
                  </button>
                )}
                <button
                  className={STYLES.actionButton}
                  title="Eliminar reseña"
                  disabled={deletingId === review.id}
                  onClick={() => handleDelete(review.id)}
                >
                  {deletingId === review.id ? (
                    <FiLoader className={STYLES.actionIcon} />
                  ) : (
                    <FaTrash className={STYLES.actionIcon} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};