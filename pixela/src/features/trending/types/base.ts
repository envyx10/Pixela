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