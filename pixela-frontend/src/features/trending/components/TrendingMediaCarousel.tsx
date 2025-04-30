'use client';
import { MediaCarousel } from '@/shared/components/MediaCarousel';
import { TrendingMediaCard } from './TrendingMediaCard';
import { TrendingSerie, TrendingMovie } from '../type';

interface TrendingMediaCarouselProps {
  content: (TrendingSerie | TrendingMovie)[];
  type: 'series' | 'movies';
}

export const TrendingMediaCarousel = ({ content, type }: TrendingMediaCarouselProps) => {
  return (
    <MediaCarousel
      className="trending-carousel"
      slidesClassName="flex gap-0"
    >
      {content.map((item, index) => (
        <div 
          key={item.id} 
          className="relative min-w-[375px] max-w-[375px] w-[375px] flex-none"
        >
          <TrendingMediaCard 
            media={item} 
            type={type} 
            index={index}
          />
        </div>
      ))}
    </MediaCarousel>
  );
}; 