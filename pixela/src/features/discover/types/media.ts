import { TrendingSerie, TrendingMovie } from "@/features/trending/types";

/**
 * Tipos de medios
 * @property {string} SERIES - Series
 * @property {string} MOVIES - Películas
 */
export const MEDIA_TYPES = {
  SERIES: "series",
  MOVIES: "movies",
};

/**
 * Tipo para el tipo de contenido multimedia (serie o película)
 * @type {string}
 * @enum {string}
 * @property {string} serie - Serie
 * @property {string} pelicula - Película
 */
export type DiscoverMediaType = "serie" | "pelicula";

/**
 * Tipo para el contenido multimedia (serie o película)
 * @type {string}
 * @enum {string}
 * @property {TrendingSerie} series - Series
 * @property {TrendingMovie} movies - Películas
 */
export type MediaContent = TrendingSerie | TrendingMovie;

/**
 * Respuesta de la API para el endpoint de descubrimiento
 * @interface DiscoverResponse
 * @property {boolean} success - Si la respuesta fue exitosa
 * @property {Array<TrendingSerie | TrendingMovie>} data - Datos de la respuesta
 */
export interface DiscoverResponse {
  success: boolean;
  data: (TrendingSerie | TrendingMovie)[];
}

export type { TrendingSerie, TrendingMovie };
