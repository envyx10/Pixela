import React, { useEffect, useState } from 'react';
import { favoritesAPI } from '@/api/favorites/favorites';
import { FavoriteWithDetails } from '@/api/favorites/types';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// URL base para las imágenes de TMDB
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const ProfileFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (favoriteId: number) => {
    setDeletingId(favoriteId);
    try {
      await favoritesAPI.deleteFavorite(favoriteId);
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
    } catch (err) {
      setError('No se pudo eliminar el favorito');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    favoritesAPI.listWithDetails()
      .then(setFavorites)
      .catch(() => setError('No se pudieron cargar los favoritos'))
      .finally(() => setLoading(false));
  }, []);

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

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <FiAlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-outfit">No hay elementos en tus favoritos.</p>
      </div>
    );
  }

  return (
    <div className="[&_.content-panel__content]:!block space-y-2">
      {favorites.map(fav => (
        <div 
          key={fav.id} 
          className="flex items-center bg-pixela-dark-opacity/50 hover:bg-pixela-dark-opacity/70 transition-all duration-300 -mr-6"
        >
          {/* Imagen del poster */}
          <div className="relative w-[100px] h-[150px] flex-shrink-0 group">
            {fav.poster_path ? (
              <Link 
                href={`/${fav.item_type === 'movie' ? 'movies' : 'series'}/${fav.tmdb_id}`}
                className="block w-full h-full"
              >
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${fav.poster_path}`}
                  alt={fav.title}
                  fill
                  className="object-cover cursor-pointer transition-all duration-300 group-hover:scale-105"
                  sizes="100px"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Ver detalles</span>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-pixela-dark text-gray-500 text-sm text-center px-2">
                Sin imagen
              </div>
            )}
          </div>
          
          {/* Información */}
          <div className="flex flex-grow items-center justify-between pl-6 pr-8">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-outfit font-semibold text-white">
                  {fav.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {fav.release_date ? new Date(fav.release_date).getFullYear() : 'Sin fecha'}
                </p>
              </div>
            </div>

            {/* Botón de eliminar */}
            <button 
              className="p-3 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
              title="Eliminar de favoritos"
              disabled={deletingId === fav.id}
              onClick={() => handleDelete(fav.id)}
            >
              {deletingId === fav.id ? (
                <FiLoader className="w-5 h-5 animate-spin" />
              ) : (
                <FaTrash className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};