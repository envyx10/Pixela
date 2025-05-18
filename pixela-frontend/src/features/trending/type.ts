/**
 * Interfaz base para las propiedades comunes de los medios en tendencia
 * @property {number} id - Identificador único del medio
 * @property {string} title - Título del medio
 * @property {string} overview - Descripción del medio
 * @property {string} poster_path - Ruta de la imagen del póster
 * @property {string} backdrop_path - Ruta de la imagen de fondo
 * @property {number} vote_average - Puntuación media
 * @property {number} vote_count - Número de votos
 * @property {number} popularity - Índice de popularidad
 * @property {string} created_at - Fecha de creación en la base de datos
 * @property {string} updated_at - Fecha de última actualización
 */
export interface BaseTrendingMedia {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    created_at: string;
    updated_at: string;
}

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