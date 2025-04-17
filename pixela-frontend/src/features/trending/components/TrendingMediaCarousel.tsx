'use client';
import { MediaCarousel } from '@/shared/components/MediaCarousel';
import { TrendingMediaCard } from './TrendingMediaCard';
import { TrendingSerie } from '../type';

interface TrendingMediaCarouselProps {
  series: TrendingSerie[];
}

export const TrendingMediaCarousel = ({ series }: TrendingMediaCarouselProps) => {
  return (
    <MediaCarousel>
      {series.map((serie, index) => (
        <div key={`${serie.id}-${index}`} className="relative min-w-[375px] max-w-[375px] w-[375px] flex-none pb-16">
          <TrendingMediaCard serie={serie} />
        </div>
      ))}
    </MediaCarousel>
  );
}; 