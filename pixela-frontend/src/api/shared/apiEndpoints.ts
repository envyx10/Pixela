// URLs base
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_INTERNAL_URL;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
    // Series
    SERIES: {
        GET_BY_ID: (id: string) => `${API_BASE_URL}/api/series/${id}`,
        LIST: `${API_BASE_URL}/api/series`,
        GET_CAST: (id: string) => `${API_BASE_URL}/api/series/${id}/cast`,
        GET_VIDEOS: (id: string) => `${API_BASE_URL}/api/series/${id}/videos`,
        GET_IMAGES: (id: string) => `${BACKEND_URL}/api/series/${id}/images`,
        GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/api/series/${id}/watch-providers`,
    },

    // Películas
    PELICULAS: {
        GET_BY_ID: (id: string) => `${API_BASE_URL}/api/movies/${id}`,
        LIST: `${API_BASE_URL}/api/movies`,
        GET_CAST: (id: string) => `${API_BASE_URL}/api/movies/${id}/cast`,
        GET_VIDEOS: (id: string) => `${API_BASE_URL}/api/movies/${id}/videos`,
        GET_IMAGES: (id: string) => `${BACKEND_URL}/api/movies/${id}/images`,
        GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/api/movies/${id}/watch-providers`,
    },

    // Auth
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTER: '/register',
        USER: '/user',
    },

    // Users
    USERS: {
        LIST: '/users',
        CREATE: '/users',
        UPDATE: '/users/:id',
        DELETE: '/users/:id',
    },

    // Favorites
    FAVORITES: {
        LIST: '/favorites',
        CREATE: '/favorites',
        DELETE: '/favorites/:id',
        DETAILS: '/favorites/details',
    },

    // Reviews
    REVIEWS: {
        LIST: '/reviews',
        CREATE: '/reviews',
        UPDATE: '/reviews/:id',
        DELETE: '/reviews/:id',
    }

};