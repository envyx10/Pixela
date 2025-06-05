import { BACKEND_URL, API_URL } from './apiEndpoints';

/**
 * Interfaz para los errores de la API
 * @interface APIError
 * @property {number} status - Código de estado de la respuesta
 */
interface APIError extends Error {
  status: number;
}

/**
 * Estado del token CSRF
 * @type {boolean}
 */
let csrfInitialized = false;

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
 * Helper para obtener el token CSRF
 * @returns {Promise<void>}
 */
async function initCsrf(): Promise<void> {
  if (csrfInitialized) return;
  
  try {
    console.log('Inicializando CSRF token...');
    const response = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error obteniendo CSRF token: ${response.status}`);
    }
    
    csrfInitialized = true;
    console.log('CSRF token inicializado correctamente');

  } catch (error) {
    console.error('[API] Error inicializando CSRF:', error);
    csrfInitialized = false;
    throw error;
  }
}

/**
 * Helper para hacer peticiones a la API
 * @param {string} url - URL de la petición
 * @param {RequestInit} options - Opciones de la petición
 * @returns {Promise<T>} - Respuesta de la petición
 */
export async function fetchFromAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    /**
     * Asegurarnos de tener el token CSRF
     */
    await initCsrf();

    /**
     * Obtener el token CSRF
     */
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    /**
     * Construir la URL completa
     */
    const fullUrl = url.startsWith('http') 
      ? url 
      : `${API_URL}${url.startsWith('/') ? url : `/${url}`}`;
    
    console.log('Haciendo petición a:', fullUrl);
    
    /**
     * Realizar la petición
     */
    const response = await fetch(fullUrl, {
      ...options,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(token ? { 'X-XSRF-TOKEN': decodeURIComponent(token) } : {}),
        ...(options.headers || {}),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error en la respuesta:`, {
        status: response.status,
        url: fullUrl,
        error: errorText
      });
      const error = new Error(`Error en la respuesta: ${response.status} - ${errorText}`) as APIError;
      error.status = response.status;
      throw error;
    }
    
    const data = await response.json();
    console.log('Respuesta recibida:', data);
    return data;

  } catch (error) {
    console.error('[API] Error en fetchFromAPI:', error);
    throw error;
  }
}