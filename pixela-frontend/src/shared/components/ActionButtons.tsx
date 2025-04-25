'use client';

import { FaInfoCircle, FaBookmark, FaRegComments } from "react-icons/fa";
import Link from "next/link";

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
  detailsHref
}: ActionButtonsProps) => {
  
  const handleInfoClick = onInfoClick || onDetailsClick || (() => {});
  const handleFollowClick = onFollowClick || (() => {});
  const handleReviewsClick = onReviewsClick || (() => {});
  const finalInfoLabel = infoLabel || detailsLabel || "Más información";
  
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
      {isHero && <span>{finalInfoLabel}</span>}
    </Link>
  ) : (
    <button 
      className={primaryBtnClass}
      onClick={handleInfoClick}
    >
      <FaInfoCircle className={isHero ? "h-3 w-3" : "w-4 h-4"} />
      {isHero && <span>{finalInfoLabel}</span>}
    </button>
  );
  
  return (
    <div className="flex gap-2 flex-wrap">
      {InfoButton}
      <button 
        className={secondaryBtnClass}
        onClick={handleFollowClick}
        title={followTitle || followLabel}
      >
        <FaBookmark className={isHero ? "h-3 w-3" : "w-4 h-4"} />
        {isHero && <span>{followLabel}</span>}
      </button>
      <button 
        className={secondaryBtnClass}
        onClick={handleReviewsClick}
        title={reviewsTitle || reviewsLabel}
      >
        <FaRegComments className={isHero ? "h-3 w-3" : "w-4 h-4"} />
        {isHero && <span>{reviewsLabel}</span>}
      </button>
    </div>
  );
};