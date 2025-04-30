import { SeriesResponse, MoviesResponse, TrendingSerie, TrendingMovie } from "@/features/trending/type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_INTERNAL_URL;

/**
 * Obtiene las series en tendencia
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series en tendencia
 */
export async function getTrendingSeries(limit = 20, offset = 0): Promise<TrendingSerie[]> {
    try {
        console.log(`Fetching trending series from: ${API_BASE_URL}/api/series/trending?limit=${limit}&offset=${offset}`);
        const response = await fetch(`${API_BASE_URL}/api/series/trending?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: SeriesResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching trending series:', error);
        // Devolver un array vacío en caso de error para evitar fallos en la UI
        return [];
    }
}

/**
 * Obtiene las películas en tendencia
 * @param limit Número de películas a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de películas en tendencia
 */
export async function getTrendingMovies(limit = 20, offset = 0): Promise<TrendingMovie[]> {
    try {
        console.log(`Fetching trending movies from: ${API_BASE_URL}/api/movies/trending?limit=${limit}&offset=${offset}`);
        const response = await fetch(`${API_BASE_URL}/api/movies/trending?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }

        const data: MoviesResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching trending movies:', error);
        // Devolver un array vacío en caso de error para evitar fallos en la UI
        return [];
    }
} 