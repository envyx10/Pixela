// Favorito
export interface Favorite {
    id: number;
    user_id: number;
    tmdb_id: number;
    item_type: 'movie' | 'series';
}

// Favorito con detalles
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