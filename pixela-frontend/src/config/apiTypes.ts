// Respuesta de autenticación
export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        surname: string;
        email: string;
        photo_url: string;
        is_admin: boolean;
        password: string;
        created_at: string;
    };
}

// Respuesta de usuario
export interface UserResponse {
    id: number;
    name: string;
    surname: string;
    email: string;
    photo_url: string;
    is_admin: boolean;
    password: string;
    created_at: string;
}

// Favorito
export interface Favorite {
    id: number;
    user_id: number;
    tmdb_id: number;
    item_type: string;
}

// Favorito con detalles
export interface FavoriteWithDetails {
    id: number;
    user_id: number;
    tmdb_id: number;
    item_type: string;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
}

// Reseña
export interface Review {
    id: number;
    user_id: number;
    item_type: string;
    tmdb_id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
}

// Usuario
export interface User {
    id: number;
    name: string;
    email: string;
    photo_url: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}