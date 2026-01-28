'use client';
import { MediaCarousel } from '@/shared/components/MediaCarousel';
import { TrendingMediaCard } from '../content/TrendingMediaCard';
import type { TrendingMediaCarouselProps, TrendingMediaSlideProps } from '@/features/trending/types';


/**
 * Constantes de estilo para el carrusel de medios
 */
const STYLES = {
  container: 'trending-carousel mx-0',
  slides: 'flex gap-0',
  slide: 'relative w-[280px] min-w-[280px] max-w-[280px] md:w-[375px] md:min-w-[375px] md:max-w-[375px] flex-none'
} as const;

/**
 * Componente que renderiza un slide individual del carrusel
 * @param {TrendingMediaSlideProps} props - Props del componente
 * @returns {JSX.Element} Slide individual
 */
const TrendingMediaSlide = ({ item, type, index }: TrendingMediaSlideProps) => (
  <div className={STYLES.slide}>
    <TrendingMediaCard 
      media={item} 
      type={type} 
      index={index}
    />
  </div>
);

/**
 * Componente que renderiza el carrusel de medios en tendencia
 * @param {TrendingMediaCarouselProps} props - Props del componente
 * @returns {JSX.Element} Carrusel de medios
 */
export const TrendingMediaCarousel = ({ content, type }: TrendingMediaCarouselProps) => {
  return (
    <MediaCarousel
      className={STYLES.container}
      slidesClassName={STYLES.slides}
    >
      {content.map((item, index) => (
        <TrendingMediaSlide
          key={item.id}
          item={item}
          type={type}
          index={index}
        />
      ))}
    </MediaCarousel>
  );
}; 