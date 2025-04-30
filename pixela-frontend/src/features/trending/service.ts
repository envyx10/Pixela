import { SeriesResponse, MoviesResponse, TrendingSerie, TrendingMovie } from "@/features/trending/type";
import { API_ENDPOINTS, fetchFromAPI } from "@/config/api";

/**
 * Obtiene las series en tendencia
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series en tendencia
 */
export async function getTrendingSeries(limit = 20, offset = 0): Promise<TrendingSerie[]> {
    try {
        const data: SeriesResponse = await fetchFromAPI(
            `${API_ENDPOINTS.SERIES.GET_TRENDING}?limit=${limit}&offset=${offset}`
        );
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
        const data: MoviesResponse = await fetchFromAPI(
            `${API_ENDPOINTS.PELICULAS.GET_TRENDING}?limit=${limit}&offset=${offset}`
        );
        return data.data;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        // Devolver un array vacío en caso de error para evitar fallos en la UI
        return [];
    }
} 