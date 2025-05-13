// Reseña
export interface Review {
    id: number;
    user_id: number;
    user_name: string;
    photo_url?: string;
    item_type: 'movie' | 'series';
    tmdb_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    title?: string;
    poster_path?: string;
}

// Campos requeridos para crear una reseña
export interface CreateReview {
    item_type: 'movie' | 'series';
    tmdb_id: number;
    rating: number;
    review: string;
}