import { TrendingSerie, TrendingMovie } from "@/features/trending/type";

/**
 * Tipo de contenido multimedia
 */
export type MediaType = 'series' | 'movies';

/**
 * Respuesta de la API para el endpoint de descubrimiento
 */
export interface DiscoverResponse {
    success: boolean;
    data: (TrendingSerie | TrendingMovie)[];
}

/**
 * Tipo para el contenido multimedia (serie o película)
 */
export type MediaContent = TrendingSerie | TrendingMovie;

export type { TrendingSerie, TrendingMovie }; 