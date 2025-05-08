import React, { useEffect, useState } from 'react';
import { reviewsAPI } from '@/api/reviews/reviews';
import { Review } from '@/api/reviews/types';
import { FiLoader, FiAlertCircle, FiStar, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function ProfileReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para edición y borrado
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editRating, setEditRating] = useState<number>(5); // 5 = 5.0
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    reviewsAPI.list()
      .then(setReviews)
      .catch(() => setError('No se pudieron cargar las reseñas.'))
      .finally(() => setLoading(false));
  }, []);

  // Eliminar review
  const handleDelete = async (reviewId: number) => {
    setDeletingId(reviewId);
    try {
      await reviewsAPI.delete(reviewId);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      setError('No se pudo eliminar la reseña');
    } finally {
      setDeletingId(null);
    }
  };

  // Iniciar edición
  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setEditText(review.review);
    setEditRating(Number(review.rating)); // rating ya es decimal (0-10)
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditRating(5);
  };

  // Guardar edición
  const handleSaveEdit = async (review: Review) => {
    setSavingId(review.id);
    try {
      await reviewsAPI.update({
        ...review,
        review: editText,
        rating: editRating
      });
      // Vuelve a pedir la lista completa para refrescar todos los campos
      const updatedReviews = await reviewsAPI.list();
      setReviews(updatedReviews);
      setEditingId(null);
      setEditText('');
      setEditRating(5);
    } catch (err) {
      setError('No se pudo actualizar la reseña');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FiLoader className="w-8 h-8 text-pixela-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <FiAlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <FiAlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-outfit">No hay reseñas.</p>
      </div>
    );
  }

  return (
    <div className="[&_.content-panel__content]:!block space-y-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex items-center bg-pixela-dark-opacity/50 hover:bg-pixela-dark-opacity/70 transition-all duration-300 -mr-6"
        >
          {/* Imagen del poster si existe */}
          <div className="relative w-[100px] h-[150px] flex-shrink-0">
            {review.poster_path ? (
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${review.poster_path}`}
                alt={review.title || (review.item_type === 'movie' ? 'Película' : 'Serie')}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-pixela-dark text-gray-500 text-sm text-center px-2">
                Sin imagen
              </div>
            )}
          </div>

          {/* Información de la reseña */}
          <div className="flex flex-grow items-center justify-between pl-6 pr-8 py-4">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white font-outfit">
                  {review.title || `${review.item_type === 'movie' ? 'Película' : 'Serie'} #${review.tmdb_id}`}
                </span>
                <span className="flex items-center text-yellow-400 ml-2">
                  <FiStar className="w-4 h-4 mr-1" />
                  {editingId === review.id
                    ? (
                      <input
                        type="number"
                        min={0}
                        max={10}
                        step={0.1}
                        value={editRating}
                        onChange={e => setEditRating(Number(e.target.value))}
                        className="w-16 bg-transparent border-b border-pixela-primary text-yellow-400 text-center focus:outline-none"
                        disabled={savingId === review.id}
                      />
                    )
                    : Number(review.rating).toFixed(1)
                  }
                </span>
              </div>
              {/* Texto o textarea editable */}
              {editingId === review.id ? (
                <div className="flex flex-col gap-2 mt-1">
                  <textarea
                    className="w-full rounded bg-[#181818] border border-gray-600 text-white p-2 resize-none"
                    rows={3}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    disabled={savingId === review.id}
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                      title="Guardar"
                      onClick={() => handleSaveEdit(review)}
                      disabled={savingId === review.id}
                    >
                      {savingId === review.id ? (
                        <FiLoader className="w-5 h-5 animate-spin" />
                      ) : (
                        <FiCheck className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                      title="Cancelar"
                      onClick={handleCancelEdit}
                      disabled={savingId === review.id}
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 text-sm mt-1">{review.review}</p>
              )}
              <span className="text-xs text-gray-400 mt-1">
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
              </span>
            </div>
            {/* Botones de editar y borrar */}
            <div className="flex items-center gap-2 ml-6">
              {editingId !== review.id && (
                <button
                  className="p-3 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Editar reseña"
                  onClick={() => handleEdit(review)}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
              )}
              <button
                className="p-3 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                title="Eliminar reseña"
                disabled={deletingId === review.id}
                onClick={() => handleDelete(review.id)}
              >
                {deletingId === review.id ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  <FaTrash className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}