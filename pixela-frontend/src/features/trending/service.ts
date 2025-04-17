import { SeriesResponse, TrendingSerie } from "@/features/trending/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.test/api';

/**
 * Obtiene las series en tendencia
 * @param limit Número de series a obtener
 * @param offset Punto de inicio para la paginación
 * @returns Lista de series en tendencia
 */
export async function getTrendingSeries(limit = 20, offset = 0): Promise<TrendingSerie[]> {
    try {
        const response = await fetch(`${API_URL}/series/trending?limit=${limit}&offset=${offset}`);
        
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