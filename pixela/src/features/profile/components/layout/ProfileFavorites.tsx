import { useEffect, useState } from 'react';
import { favoritesAPI } from '@/api/favorites/favorites';
import type { FavoriteWithDetails } from '@/api/favorites/types';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * URL base para las imágenes de TMDB
 */
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

/**
 * Mensajes de error constantes
 */
const ERROR_MESSAGES = {
  DELETE: 'No se pudo eliminar el favorito',
  LOAD: 'No se pudieron cargar los favoritos',
  EMPTY: 'No hay elementos en tus favoritos.'
} as const;

/**
 * Estilos constantes para el componente ProfileFavorites
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
  favoriteItem: clsx(
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
  infoContainer: 'flex flex-grow items-center justify-between pl-6 pr-8',
  titleContainer: 'flex items-center gap-3',
  title: 'text-lg font-outfit font-semibold text-white',
  year: 'text-gray-400 text-sm mt-1',
  deleteButton: clsx(
    'p-3 text-gray-400 hover:text-[#ec1b69]',
    'transition-colors duration-200'
  ),
  deleteIcon: 'w-5 h-5',
  link: 'block w-full h-full'
} as const;

/**
 * Componente que muestra la lista de favoritos del usuario
 * @returns {JSX.Element} Componente ProfileFavorites
 */
export const ProfileFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /**
   * Maneja la eliminación de un favorito
   * @param {number} favoriteId - ID del favorito a eliminar
   */
  const handleDelete = async (favoriteId: number) => {
    setDeletingId(favoriteId);
    try {
      await favoritesAPI.deleteFavorite(favoriteId);
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    } catch {
      setError(ERROR_MESSAGES.DELETE);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    favoritesAPI.listWithDetails()
      .then(setFavorites)
      .catch(() => setError(ERROR_MESSAGES.LOAD))
      .finally(() => setLoading(false));
  }, []);

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

  if (favorites.length === 0) {
    return (
      <div className={STYLES.emptyContainer}>
        <FiAlertCircle className={STYLES.emptyIcon} />
        <p className={STYLES.emptyText}>{ERROR_MESSAGES.EMPTY}</p>
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      {favorites.map(fav => (
        <div key={fav.id} className={STYLES.favoriteItem}>
          <div className={STYLES.posterContainer}>
            {fav.poster_path ? (
              <Link 
                href={`/${fav.item_type === 'movie' ? 'movies' : 'series'}/${fav.tmdb_id}`}
                className={STYLES.link}
              >
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${fav.poster_path}`}
                  alt={fav.title}
                  fill
                  className={STYLES.posterImage}
                  sizes="100px"
                />
                <div className={STYLES.posterOverlay}>
                  <span className={STYLES.overlayText}>Ver detalles</span>
                </div>
              </Link>
            ) : (
              <div className={STYLES.noImageContainer}>
                Sin imagen
              </div>
            )}
          </div>
          
          <div className={STYLES.infoContainer}>
            <div className={STYLES.titleContainer}>
              <div>
                <h3 className={STYLES.title}>
                  {fav.title}
                </h3>
                <p className={STYLES.year}>
                  {fav.release_date ? new Date(fav.release_date).getFullYear() : 'Sin fecha'}
                </p>
              </div>
            </div>

            <button 
              className={STYLES.deleteButton}
              title="Eliminar de favoritos"
              disabled={deletingId === fav.id}
              onClick={() => handleDelete(fav.id)}
            >
              {deletingId === fav.id ? (
                <FiLoader className={STYLES.deleteIcon} />
              ) : (
                <FaTrash className={STYLES.deleteIcon} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};