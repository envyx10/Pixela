import type { TrendingSerie, TrendingMovie } from './media';

/**
 * Interfaz genérica para las respuestas de la API de tendencias
 * @template T - Tipo de medio (TrendingSerie o TrendingMovie)
 * @property {boolean} success - Indica si la petición fue exitosa
 * @property {T[]} data - Array de medios en tendencia
 */
export interface TrendingResponse<T> {
    success: boolean;
    data: T[];
}

/**
 * Tipo para la respuesta de series en tendencia
 */
export type SeriesResponse = TrendingResponse<TrendingSerie>;

/**
 * Tipo para la respuesta de películas en tendencia
 */
export type MoviesResponse = TrendingResponse<TrendingMovie>; 