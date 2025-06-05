/**
 * Favorito
 * @interface Favorite
 * @property {number} id - ID del favorito
 * @property {number} user_id - ID del usuario
 * @property {number} tmdb_id - ID de la película o serie
 * @property {string} item_type - Tipo de elemento (película o serie)
*/
export interface Favorite {
    id: number;
    user_id: number;
    tmdb_id: number;
    item_type: 'movie' | 'series';
}

/**
 * Tipo para crear un favorito
 * @interface CreateFavorite
 * @property {number} tmdb_id - ID de la película o serie
 * @property {string} item_type - Tipo de elemento (película o serie)
*/
export interface CreateFavorite {
    tmdb_id: number;
    item_type: 'movie' | 'series';
}

/**
 * Favorito con detalles
 * @interface FavoriteWithDetails
 * @property {number} id - ID del favorito
 * @property {number} user_id - ID del usuario
 * @property {number} tmdb_id - ID de la película o serie
 * @property {string} item_type - Tipo de elemento (película o serie)                           
*/
export interface FavoriteWithDetails {
    id: number;
    user_id: number;
    tmdb_id: number;
    item_type: 'movie' | 'series';
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}