'use client';

import { FaInfoCircle, FaBookmark, FaRegComments } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { favoritesAPI } from '@/api/favorites/favorites';

interface ActionButtonsProps {
  onInfoClick?: () => void;
  onFollowClick?: () => void;
  onReviewsClick?: () => void;
  infoLabel?: string;
  followLabel?: string;
  reviewsLabel?: string;
  variant?: 'hero' | 'default';
  onDetailsClick?: () => void;
  detailsLabel?: string;
  followTitle?: string;
  reviewsTitle?: string;
  detailsHref?: string;
  tmdbId?: number;
  itemType?: 'movie' | 'series';
}

export const ActionButtons = ({
  onInfoClick,
  onFollowClick,
  onReviewsClick,
  infoLabel = "Más información",
  followLabel = "Seguir",
  reviewsLabel = "Reseñas",
  variant = 'default',
  onDetailsClick,
  detailsLabel,
  followTitle,
  reviewsTitle,
  detailsHref,
  tmdbId,
  itemType
}: ActionButtonsProps) => {
  // Favoritos
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!tmdbId || !itemType || !isAuthenticated) return;
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
      }
    };
    checkFavoriteStatus();
  }, [isAuthenticated, tmdbId, itemType]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';
      return;
    }
    if (!tmdbId || !itemType) return;
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
      // Refresca el estado real desde la API
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
        window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviews = () => {
    if (!isAuthenticated) {
      window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';
      return;
    }
    if (onReviewsClick) onReviewsClick();
  };

  const handleFollow = tmdbId && itemType ? handleFavorite : (onFollowClick || (() => {}));

  const isHero = variant === 'hero';

  const primaryBtnClass = isHero 
    ? "flex items-center gap-2 bg-pixela-accent hover:bg-pixela-accent/90 text-white px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium"
    : "flex-1 bg-pixela-accent hover:bg-pixela-accent/90 text-pixela-light py-2.5 rounded flex items-center justify-center gap-2 font-medium transition-colors";
    
  const secondaryBtnClass = isHero
    ? "flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md backdrop-blur-sm transition-all duration-300 text-sm font-medium"
    : "w-12 h-12 flex items-center justify-center bg-pixela-dark hover:bg-pixela-dark/80 rounded text-pixela-light transition-colors border border-pixela-accent/40";

  const InfoButton = detailsHref ? (
    <Link href={detailsHref} className={primaryBtnClass}>
      <FaInfoCircle className={isHero ? "h-3 w-3" : "w-4 h-4"} />
      {isHero && <span>{infoLabel || detailsLabel || "Más información"}</span>}
    </Link>
  ) : (
    <button 
      className={primaryBtnClass}
      onClick={onInfoClick || onDetailsClick || (() => {})}
    >
      <FaInfoCircle className={isHero ? "h-3 w-3" : "w-4 h-4"} />
      {isHero && <span>{infoLabel || detailsLabel || "Más información"}</span>}
    </button>
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {InfoButton}
      <button 
        className={
          tmdbId && itemType
            ? `p-3 rounded font-medium transition duration-300 flex items-center gap-2 shadow-lg
                ${isFavorited
                  ? 'bg-pixela-accent text-white hover:bg-pixela-accent/90'
                  : secondaryBtnClass
                }`
            : secondaryBtnClass
        }
        onClick={handleFollow}
        title={followTitle || followLabel}
        disabled={isLoading}
      >
        <FaBookmark className={
          tmdbId && itemType
            ? 'w-5 h-5 transition-all duration-300'
            : isHero ? "h-3 w-3" : "w-4 h-4"
        } />
        {isHero && <span>{followLabel}</span>}
      </button>
      <button 
        className={secondaryBtnClass}
        onClick={handleReviews}
        title={reviewsTitle || reviewsLabel}
      >
        <FaRegComments className={isHero ? "h-3 w-3" : "w-4 h-4"} />
        {isHero && <span>{reviewsLabel}</span>}
      </button>
    </div>
  );
};