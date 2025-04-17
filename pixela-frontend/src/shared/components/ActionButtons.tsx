'use client';
import { FaInfoCircle, FaBookmark, FaRegComments } from "react-icons/fa";

interface ActionButtonsProps {
  onDetailsClick?: () => void;
  onFollowClick?: () => void;
  onReviewsClick?: () => void;
  detailsLabel?: string;
  followTitle?: string;
  reviewsTitle?: string;
}

export const ActionButtons = ({
  onDetailsClick,
  onFollowClick,
  onReviewsClick,
  detailsLabel = "Detalles",
  followTitle = "Seguir",
  reviewsTitle = "Ver reseñas"
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button 
        className="flex-1 bg-pixela-accent hover:bg-pixela-accent/90 text-pixela-light py-2.5 rounded 
                 flex items-center justify-center gap-2 font-medium transition-colors"
        onClick={onDetailsClick}
      >
        <FaInfoCircle />
        <span>{detailsLabel}</span>
      </button>
      <button 
        className="w-12 h-12 flex items-center justify-center bg-pixela-dark hover:bg-pixela-dark/80 
                 rounded text-pixela-light transition-colors border border-pixela-accent/40"
        title={followTitle}
        onClick={onFollowClick}
      >
        <FaBookmark size={16} />
      </button>
      <button 
        className="w-12 h-12 flex items-center justify-center bg-pixela-dark hover:bg-pixela-dark/80 
                 rounded text-pixela-light transition-colors border border-pixela-accent/40"
        title={reviewsTitle}
        onClick={onReviewsClick}
      >
        <FaRegComments size={16} />
      </button>
    </div>
  );
};

export default ActionButtons; 