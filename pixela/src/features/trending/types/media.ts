import type { BaseTrendingMedia } from './base';

/**
 * Interfaz para series en tendencia
 * Extiende BaseTrendingMedia y añade propiedades específicas de series
 * @property {string} first_air_date - Fecha de primera emisión
 */
export interface TrendingSerie extends BaseTrendingMedia {
    first_air_date: string;
}

/**
 * Interfaz para películas en tendencia
 * Extiende BaseTrendingMedia y añade propiedades específicas de películas
 * @property {string} release_date - Fecha de estreno
 */
export interface TrendingMovie extends BaseTrendingMedia {
    release_date: string;
} 