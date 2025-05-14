import { FiStar, FiLoader, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';
import { Review } from '@/api/reviews/types';
import { useAuthStore } from '@/stores/useAuthStore';

interface ReviewSectionProps {
  tmdbId: number;
  itemType: 'movie' | 'series';
  reviews: Review[];
  loading: boolean;
  error: string | null;
  refreshReviews: () => void;
}

const StarDisplay = ({ value }: { value: number }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      const starValue = star * 2;
      const isFull = value >= starValue;
      const isHalf = value === starValue - 1;
      return (
        <span
          key={star}
          className="relative inline-block w-6 h-6 transition-transform duration-200 hover:scale-110"
        >
          <FiStar className={`w-6 h-6 absolute top-0 left-0 ${isFull ? 'text-yellow-400' : 'text-gray-400'}`} />
          {isHalf && (
            <FiStar
              className="w-6 h-6 absolute top-0 left-0 text-yellow-400"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          )}
        </span>
      );
    })}
    <span className="ml-2 text-xs text-gray-400">{value % 1 === 0 ? value : value.toFixed(1)}/10</span>
  </span>
);

export function ReviewSection({ reviews, loading, error }: ReviewSectionProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <FiLoader className="w-8 h-8 text-pixela-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-500">
        <FiAlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="mt-12 mb-24">
      <h2 className="text-2xl font-bold text-white mb-8">Reseñas de usuarios</h2>
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FiAlertCircle className="w-8 h-8 mb-2" />
          <p className="text-base font-outfit">No hay reseñas para este título.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#18181b]/80 border border-white/10 rounded-2xl shadow-lg px-6 py-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pixela-accent/20 text-pixela-accent font-bold text-lg overflow-hidden">
                      {review.photo_url ? (
                        <Image
                          src={review.photo_url}
                          alt={review.user_name || 'Avatar'}
                          width={32}
                          height={32}
                          className="object-cover w-8 h-8 rounded-full"
                        />
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </span>
                    <span className="font-semibold text-white text-base">{review.user_name || 'Usuario'}</span>
                  </div>
                  <span className="ml-4 flex items-center">
                    <StarDisplay value={Number(review.rating)} />
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {review.created_at && new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-200 text-lg leading-relaxed mt-2 whitespace-pre-line">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 