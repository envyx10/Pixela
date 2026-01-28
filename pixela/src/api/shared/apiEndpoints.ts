/**
 * URL de la API
 * @namespace API_BASE_URL
 * @description URL de la API
 */
// Ajuste crítico: Detectar entorno para evitar localhost en producción
const getBaseUrl = () => {
    // Si estamos en el navegador (Cliente)
    if (typeof window !== 'undefined') {
        // Si NO estamos en localhost (es decir, estamos en Vercel/Producción)
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
             return '/api'; // Forzar ruta relativa
        }
    }
    // En el servidor (Build/SSR) o Localhost, usamos la variable o el default
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
};

const BASE_URL = getBaseUrl();

export const API_BASE_URL = BASE_URL; 
export const API_URL = BASE_URL;

/**
 * Endpoints de la API
 * @namespace API_ENDPOINTS
 * @description Endpoints de la API
 */
export const API_ENDPOINTS = {
    /**
     * Series
     * @namespace SERIES
     * @description Series
     */
    SERIES: {
        GET_BY_ID: (id: string) => `${API_BASE_URL}/series/${id}`,
        LIST: `${API_BASE_URL}/series`,
        GET_CAST: (id: string) => `${API_BASE_URL}/series/${id}/cast`, // Estos fallarán si no creamos rutas, pero el ID sí funcionará
        GET_VIDEOS: (id: string) => `${API_BASE_URL}/series/${id}/videos`,
        GET_IMAGES: (id: string) => `${API_URL}/series/${id}/images`,
        GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/series/${id}/watch-providers`,
    },

    /**
     * Películas
     * @namespace PELICULAS
     * @description Películas
     */
    PELICULAS: {
        GET_BY_ID: (id: string) => `${API_BASE_URL}/movies/${id}`,
        LIST: `${API_BASE_URL}/movies`,
        GET_CAST: (id: string) => `${API_BASE_URL}/movies/${id}/cast`,
        GET_VIDEOS: (id: string) => `${API_BASE_URL}/movies/${id}/videos`,
        GET_IMAGES: (id: string) => `${API_URL}/movies/${id}/images`,
        GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/movies/${id}/watch-providers`,
    },

    /**
     * Auth
     * @namespace AUTH
     * @description Auth
     */
    AUTH: {
        LOGIN: `${API_URL}/login`,
        LOGOUT: `${API_URL}/logout`,
        REGISTER: `${API_URL}/register`,
        USER: `${API_URL}/user`,
    },

    /**
     * Users
     * @namespace USERS
     * @description Users
     */
    USERS: {
        LIST: `${API_URL}/users`,
        CREATE: `${API_URL}/users`,
        UPDATE: `${API_URL}/users/:id`,
        DELETE: `${API_URL}/users/:id`,
    },

    /**
     * Favorites
     * @namespace FAVORITES
     * @description Favorites
     */
    FAVORITES: {
        ADD: `${API_URL}/favorites`,
        LIST: `${API_URL}/favorites`,
        DELETE: `${API_URL}/favorites/:id`,
        DETAILS: `${API_URL}/favorites/details`,
    },

    /**
     * Reviews
     * @namespace REVIEWS
     * @description Reviews
     */
    REVIEWS: {
        LIST: `${API_URL}/reviews`,
        BY_MEDIA: `${API_URL}/reviews/media/:tmdbId/:itemType`,
        CREATE: `${API_URL}/reviews`,
        UPDATE: `${API_URL}/reviews/:id`,
        DELETE: `${API_URL}/reviews/:id`,
    },

    /**
     * Categories
     * @namespace CATEGORIES
     * @description Categories
     */
    CATEGORIES: {
        LIST: `${API_URL}/tmdb/categories`,
    }

};