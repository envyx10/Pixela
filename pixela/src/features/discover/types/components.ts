import { TrendingSerie, TrendingMovie } from "@/features/trending/types";
import { MediaContent, DiscoverMediaType as MediaType } from "./media";

/**
 * Props del componente DiscoverSection
 * @interface DiscoverSectionProps
 * @property {TrendingSerie[]} series - Lista de series en tendencia
 * @property {TrendingMovie[]} movies - Lista de películas en tendencia
 */
export interface DiscoverSectionProps {
  series: TrendingSerie[];
  movies: TrendingMovie[];
}

/**
 * Propiedades para el componente DiscoverSelector
 * @interface DiscoverSelectorProps
 * @property {MediaType} activeType - El tipo de medio activo ('serie' o 'pelicula')
 * @property {(type: MediaType) => void} onTypeChange - Función para cambiar el tipo de medio activo
 */
export interface DiscoverSelectorProps {
  activeType: MediaType;
  onTypeChange: (type: MediaType) => void;
}

/**
 * Propiedades para el componente DiscoverCard
 * @interface DiscoverCardProps
 * @property {MediaContent} media - El objeto de medio a mostrar
 * @property {MediaType} type - El tipo de medio ('serie' o 'pelicula')
 * @property {number} index - El índice de la tarjeta, usado para optimización de carga de imágenes
 * @property {boolean} [isMobile] - Indica si la tarjeta se muestra en una vista móvil
 */
export interface DiscoverCardProps {
  media: MediaContent;
  type: MediaType;
  index: number;
  isMobile?: boolean;
}

/**
 * Propiedades para el componente DiscoverGrid
 * @interface DiscoverGridProps
 * @property {MediaType} type - El tipo de medio a mostrar ('serie' o 'pelicula')
 */
export interface DiscoverGridProps {
  type: MediaType;
}
