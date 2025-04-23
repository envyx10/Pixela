import { SeriesResponse, Series } from "@/lib/interface/series/trending-series";
import { API_BASE_URL } from "@/config/api";

/**
 * Obtiene las series mejor valoradas
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series
 */
export async function getTopRatedSeries(limit = 20, offset = 0): Promise<Series[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/series/top-rated?limit=${limit}&offset=${offset}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }
        
        const data: SeriesResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error fetching top rated series:', error);
        throw error;
    }
}

/**
 * Busca series por título
 * @param query Término de búsqueda
 * @param limit Número de series a obtener
 * @returns Lista de series que coinciden con la búsqueda
 */
export async function searchSeries(query: string, limit = 20): Promise<Series[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/series/search?query=${encodeURIComponent(query)}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`Error de API: ${response.status} ${response.statusText}`);
        }
        
        const data: SeriesResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error('Error searching series:', error);
        throw error;
    }
} 