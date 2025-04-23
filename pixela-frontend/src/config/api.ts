/**
 * Configuración centralizada para la API de Pixela
 */

// URL base de la API - se configura en .env.local
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.test';

// Endpoints específicos
export const API_ENDPOINTS = {
  // Series
  SERIES: {
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/series/${id}`,
    LIST: `${API_BASE_URL}/api/series`,
  },
  
  // Películas
  PELICULAS: {
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/peliculas/${id}`,
    LIST: `${API_BASE_URL}/api/peliculas`,
  },
};

// Opciones por defecto para las peticiones fetch
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  cache: 'no-store' as RequestCache
};

// Helper para hacer peticiones a la API
export async function fetchFromAPI<T>(url: string, options = {}): Promise<T> {
  console.log(`[API] Realizando petición a: ${url}`);
  
  const response = await fetch(url, {
    ...DEFAULT_FETCH_OPTIONS,
    ...options,
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[API] Error en la respuesta: ${response.status} - ${errorText}`);
    throw new Error(`Error en la respuesta: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  return data;
} 