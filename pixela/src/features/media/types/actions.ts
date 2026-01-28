/**
 * Props para el componente ActionButtons
 * @interface ActionButtonsProps
 * @property {number} tmdbId - ID de la película o serie
 * @property {'movie' | 'series'} itemType - Tipo de película o serie
 * @property {string} title - Título de la película o serie
 * @property {() => void} [refreshReviews] - Función para refrescar las reseñas
 */
export interface ActionButtonsProps {
    tmdbId: number;
    itemType: 'movie' | 'series';
    title: string;
    refreshReviews?: () => void;
  }