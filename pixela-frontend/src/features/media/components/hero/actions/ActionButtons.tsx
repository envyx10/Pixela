"use client";

import { FaBookmark, FaPen } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { favoritesAPI } from '@/api/favorites/favorites';
import { ReviewModal } from '../../review/ReviewModal';

interface ActionButtonsProps {
  tmdbId: number;
  itemType: 'movie' | 'series';
  title: string;
  refreshReviews?: () => void;
}

export const ActionButtons = ({ tmdbId, itemType, title, refreshReviews }: ActionButtonsProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isAuthenticated) return;

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

  const handleReview = () => {
    if (!isAuthenticated) {
      window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + '/login';
      return;
    }
    setShowReviewModal(true);
  };

  return (
    <>
      <div className="flex gap-4">
        <button 
          onClick={handleFavorite}
          disabled={isLoading}
          className={`p-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 shadow-lg
            ${isFavorited
              ? 'bg-[#FF2D55] text-white border border-white/20 hover:bg-[#FF4A6B]'
              : 'bg-[#FF2D55]/10 text-[#FF2D55] border border-[#FF2D55]/40 hover:bg-[#FF2D55]/20'
            }
          `}
        >
          <FaBookmark className={`w-5 h-5 transition-all duration-300 ${
            isFavorited
              ? ''
              : 'drop-shadow-[0_0_8px_rgba(255,45,85,0.5)] scale-110'
          }`} />
        </button>
        <button 
          onClick={handleReview}
          className="bg-[#1A1A1A] hover:bg-[#252525] text-white px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center gap-2 border border-white/10"
        >
          <FaPen className="w-5 h-5" />
          Hacer Reseña
        </button>
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        tmdbId={tmdbId}
        itemType={itemType}
        title={title}
        refreshReviews={refreshReviews}
      />
    </>
  );
}; 