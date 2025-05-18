'use client';
import { MediaCarousel } from '@/shared/components/MediaCarousel';
import { TrendingMediaCard } from './TrendingMediaCard';
import { TrendingSerie, TrendingMovie } from '../type';

/**
 * Constantes de estilo para el carrusel de medios
 */
const CAROUSEL_CLASSES = {
  container: 'trending-carousel',
  slides: 'flex gap-0',
  slide: 'relative min-w-[375px] max-w-[375px] w-[375px] flex-none'
} as const;

/**
 * Tipo que representa el tipo de medio (series o películas)
 */
type MediaType = 'series' | 'movies';

/**
 * Props para el componente TrendingMediaCarousel
 * @property {(TrendingSerie | TrendingMovie)[]} content - Lista de medios a mostrar en el carrusel
 * @property {MediaType} type - Tipo de medio (series o películas)
 */
interface TrendingMediaCarouselProps {
  content: (TrendingSerie | TrendingMovie)[];
  type: MediaType;
}

/**
 * Props para el componente TrendingMediaSlide
 * @property {TrendingSerie | TrendingMovie} item - Medio a mostrar en el slide
 * @property {MediaType} type - Tipo de medio (series o películas)
 * @property {number} index - Índice del slide en el carrusel
 */
interface TrendingMediaSlideProps {
  item: TrendingSerie | TrendingMovie;
  type: MediaType;
  index: number;
}

/**
 * Componente que renderiza un slide individual del carrusel
 * @param {TrendingMediaSlideProps} props - Props del componente
 * @returns {JSX.Element} Slide individual
 */
const TrendingMediaSlide = ({ item, type, index }: TrendingMediaSlideProps) => (
  <div className={CAROUSEL_CLASSES.slide}>
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
      className={CAROUSEL_CLASSES.container}
      slidesClassName={CAROUSEL_CLASSES.slides}
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