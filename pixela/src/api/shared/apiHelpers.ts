import { API_URL } from './apiEndpoints';

/**
 * Interfaz para los errores de la API
 * @interface APIError
 * @property {number} status - Código de estado de la respuesta
 */
interface APIError extends Error {
  status: number;
}

/**
 * Opciones por defecto para las peticiones fetch
 * @type {RequestInit}
 */
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  cache: 'no-store' as RequestCache
};

/**
 * Helper para hacer peticiones a la API
 * @param {string} url - URL de la petición
 * @param {RequestInit} options - Opciones de la petición
 * @returns {Promise<T>} - Respuesta de la petición
 */
export async function fetchFromAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    let fullUrl: string;
    
    // Si la URL ya es absoluta (http...), la usamos tal cual
    if (url.startsWith('http')) {
      fullUrl = url;
    } 
    // Si la URL ya empieza con '/api', asumimos que es relativa a la raíz del dominio
    else if (url.startsWith('/api')) {
       fullUrl = url;
    }
    // Si no, le añadimos el prefijo configurado
    else {
       const cleanBase = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
       const cleanUrl = url.startsWith('/') ? url : `/${url}`;
       fullUrl = `${cleanBase}${cleanUrl}`;
    }
    
    console.log('[DEBUG API] Input:', url);
    console.log('[DEBUG API] Base:', API_URL);
    console.log('[DEBUG API] Final:', fullUrl);
    
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Error en la respuesta: ${response.status} - ${errorText}`) as APIError;
      error.status = response.status;
      throw error;
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('[API] Error en fetchFromAPI:', error);
    throw error;
  }
}

/**
 * Helper para hacer fetch con manejo de errores unificado
 * @param url - URL de la petición
 * @returns - Respuesta de la petición o null si hay error
 */
export async function fetchWithErrorHandling<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, DEFAULT_FETCH_OPTIONS);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[API] Error fetching ${url}:`, error);
    return null;
  }
}