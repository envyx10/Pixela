'use client';

import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useAuthStore } from '@/stores/useAuthStore';
import { favoritesAPI } from '@/api/favorites/favorites';

const STYLES = {
  container: 'absolute top-3 right-3 z-50',
  button: {
    primary: {
      hero: 'flex items-center gap-2 bg-pixela-accent hover:bg-pixela-accent/90 text-white px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium',
      default: 'flex-1 bg-pixela-accent hover:bg-pixela-accent/90 text-pixela-light py-2.5 rounded flex items-center justify-center gap-2 font-medium transition-colors'
    },
    secondary: {
      hero: 'flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md backdrop-blur-sm transition-all duration-300 text-sm font-medium',
      default: 'w-10 h-10 flex items-center justify-center bg-pixela-dark hover:bg-pixela-dark/80 rounded text-pixela-light transition-colors border border-pixela-accent/40'
    },
    favorite: {
      active: 'p-2.5 rounded-lg font-medium transition duration-300 flex items-center gap-2 shadow-lg bg-pixela-accent text-white hover:bg-pixela-accent/90',
      inactive: 'p-2.5 rounded-lg font-medium transition duration-300 flex items-center gap-2 shadow-lg bg-black/40 backdrop-blur-sm text-white hover:bg-black/50'
    }
  },
  icon: {
    hero: 'h-3 w-3',
    default: 'w-3.5 h-3.5',
    favorite: 'w-4 h-4 transition-all duration-300'
  }
} as const;

interface ActionButtonsProps {
  onInfoClick?: () => void;
  onFollowClick?: () => void;
  infoLabel?: string;
  followLabel?: string;
  variant?: 'hero' | 'default';
  onDetailsClick?: () => void;
  detailsLabel?: string;
  followTitle?: string;
  detailsHref?: string;
  tmdbId?: number;
  itemType?: 'movie' | 'series';
}

/**
 * Componente que renderiza botones de acción para películas y series
 * @param {ActionButtonsProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de botones de acción
 */
export const ActionButtons = ({
  onInfoClick,
  onFollowClick,
  infoLabel = "Más información",
  followLabel = "Seguir",
  variant = 'default',
  followTitle,
  tmdbId,
  itemType
}: ActionButtonsProps) => {
  const [isFavorited, setIsFavorited] = useState<boolean | null>(null);
  const router = useRouter();
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const isHero = variant === 'hero';

  useEffect(() => {
    if (!tmdbId || !itemType || !isAuthenticated) {
      setIsFavorited(false);
      return;
    }
    
    const checkFavoriteStatus = async () => {
      try {
        const favorites = await favoritesAPI.listWithDetails();
        const fav = favorites.find(fav =>
          fav.tmdb_id === tmdbId && fav.item_type === itemType
        );
        setIsFavorited(!!fav);
        setFavoriteId(fav ? fav.id : null);
      } catch (error) {
        console.error('Error checking favorite status:', error);
        setIsFavorited(false);
      }
    };
    
    checkFavoriteStatus();
  }, [isAuthenticated, tmdbId, itemType]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!tmdbId || !itemType) {
      onFollowClick?.();
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorited && favoriteId) {
        await favoritesAPI.deleteFavorite(favoriteId);
      } else {
        await favoritesAPI.addFavorite({
          tmdb_id: tmdbId,
          item_type: itemType,
        });
      }

      const favorites = await favoritesAPI.listWithDetails();
      const fav = favorites.find(fav =>
        fav.tmdb_id === tmdbId && fav.item_type === itemType
      );
      setIsFavorited(!!fav);
      setFavoriteId(fav ? fav.id : null);

    } catch (error) {
      console.error('Error toggling favorite:', error);
      if (error instanceof Error && error.message.includes('401')) {
        await checkAuth();
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InfoButton = onInfoClick && (
    <button 
      className={clsx(STYLES.button.primary[isHero ? 'hero' : 'default'])}
      onClick={onInfoClick}
    >
      {infoLabel}
    </button>
  );

  // No renderizamos el botón hasta que sepamos el estado inicial
  // Si no está autenticado, asumimos false para pintar el botón 'inactivo' pero funcional (que redirige a login)
  if (isFavorited === null && isAuthenticated) return null; // Solo esperamos si está intentando cargar estado

  return (
    <div className={STYLES.container}>
      {InfoButton}
      <button 
        className={clsx(
          tmdbId && itemType
            ? isFavorited 
              ? STYLES.button.favorite.active 
              : STYLES.button.favorite.inactive
            : STYLES.button.secondary[isHero ? 'hero' : 'default']
        )}
        onClick={handleFollow}
        title={followTitle || followLabel}
        disabled={isLoading}
      >
        <FaBookmark className={
          tmdbId && itemType
            ? STYLES.icon.favorite
            : STYLES.icon[isHero ? 'hero' : 'default']
        } />
        {isHero && <span>{followLabel}</span>}
      </button>
    </div>
  );
};

export default ActionButtons;