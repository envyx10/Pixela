/**
 * Índice de componentes skeleton de Pixela
 * Solo exporta los skeletons que realmente se usan en la aplicación
 * 
 * @author Pixela
 * @version 2.0.0
 */

// ===============================
// SKELETONS USADOS EN LA APLICACIÓN
// ===============================

// Hero skeleton (usado en homepage)
export { HeroSectionSkeleton } from './PageSkeletons';

// Media skeletons (usados en páginas de películas/series)
export {
  MediaPageSkeleton,
  GallerySkeleton,
  ReviewsSkeleton,
  CastSkeleton
} from './MediaSkeletons';

// Discover skeleton (usado en sección discover)
export { DiscoverGridSkeleton } from './DiscoverSkeletons';

// Categories skeleton (usado en página de categorías)
export { ContentSkeleton } from './CategorySkeletons'; 