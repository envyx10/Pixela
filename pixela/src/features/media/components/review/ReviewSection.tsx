"use client";

import { FiAlertCircle } from 'react-icons/fi';
import { Review } from '@/api/reviews/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { useState } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import { ReviewCard } from './ReviewCard';
import { ReviewSectionProps } from '@/features/media/types/reviews';
import { ReviewsSkeleton } from '@/app/components/skeletons';

const STYLES = {
  section: {
    container: "mt-12 mb-24",
    title: "text-2xl font-bold text-white mb-8"
  },
  states: {
    loading: "flex items-center justify-center py-12",
    spinner: "w-8 h-8 text-pixela-primary animate-spin",
    error: "flex items-center justify-center py-12 text-red-500",
    errorIcon: "w-6 h-6 mr-2",
    empty: "flex flex-col items-center justify-center py-12 text-gray-400",
    emptyIcon: "w-8 h-8 mb-2",
    emptyText: "text-base font-outfit"
  },
  reviews: {
    container: "space-y-8"
  }
} as const;

/** 
 * Componente que muestra la sección de reseñas
 * @param {ReviewSectionProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de sección de reseñas
 */
export function ReviewSection({ reviews, loading, error, refreshReviews }: ReviewSectionProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.user?.user_id);
  const isAdmin = useAuthStore((state) => state.user?.is_admin);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<number | null>(null);

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  /**
   * Función para guardar la reseña editada
   * @returns {Promise<void>}
   */
  const handleSaveEdit = async (text: string, rating: number) => {
    if (!editingReview) return;

    try {
      await reviewsAPI.update({
        ...editingReview,
        review: text,
        rating: rating,
      });
      
      if (refreshReviews) {
        refreshReviews();
      }
      
      handleCancelEdit();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error al actualizar la reseña:', error);
      }
    }
  };

  /**
   * Función para eliminar una reseña
   * @param {Review} review - Reseña a eliminar
   * @returns {Promise<void>}
   */
  const handleDeleteReview = async (review: Review) => {
    setDeletingReview(review.id);
    try {
      await reviewsAPI.delete(review.id);
      
      if (refreshReviews) {
        refreshReviews();
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error al eliminar la reseña:', error);
      }
    } finally {
      setDeletingReview(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={STYLES.section.container}>
        <h2 className={STYLES.section.title}>Reseñas de usuarios</h2>
        <div className={STYLES.states.empty}>
          <FiAlertCircle className={STYLES.states.emptyIcon} />
          <p className={STYLES.states.emptyText}>Inicia sesión para ver y escribir reseñas.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <ReviewsSkeleton count={3} />;
  }

  if (error) {
    return (
      <div className={STYLES.states.error}>
        <FiAlertCircle className={STYLES.states.errorIcon} />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={STYLES.section.container}>
      <h2 className={STYLES.section.title}>Reseñas de usuarios</h2>
      {reviews.length === 0 ? (
        <div className={STYLES.states.empty}>
          <FiAlertCircle className={STYLES.states.emptyIcon} />
          <p className={STYLES.states.emptyText}>No hay reseñas para este título.</p>
        </div>
      ) : (
        <div className={STYLES.reviews.container}>
          {reviews.map((review) => {
            const isUserReview = review.user_id === userId;
            const canEditReview = isUserReview || (isAdmin ?? false);
            const isEditing = editingReview?.id === review.id;

            return (
              <ReviewCard
                key={review.id}
                review={review}
                isUserReview={canEditReview}
                isEditing={isEditing}
                onEditClick={handleEditClick}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                onDelete={handleDeleteReview}
                isDeleting={deletingReview === review.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
} 