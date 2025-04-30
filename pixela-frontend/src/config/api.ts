// URLs base
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://laravel.test/api';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://laravel.test';

// Endpoints específicos
export const API_ENDPOINTS = {
  // Series
  SERIES: {
    GET_BY_ID: (id: string) => `/series/${id}`,
    LIST: '/series',
    GET_CAST: (id: string) => `/series/${id}/cast`,
    GET_VIDEOS: (id: string) => `/series/${id}/videos`,
    GET_IMAGES: (id: string) => `/series/${id}/images`,
    GET_WATCH_PROVIDERS: (id: string) => `/series/${id}/watch-providers`,
    GET_TRENDING: '/series/trending',
  },
  
  // Películas
  PELICULAS: {
    GET_BY_ID: (id: string) => `/movies/${id}`,
    LIST: '/movies',
    GET_CAST: (id: string) => `/movies/${id}/cast`,
    GET_VIDEOS: (id: string) => `/movies/${id}/videos`,
    GET_IMAGES: (id: string) => `/movies/${id}/images`,
    GET_WATCH_PROVIDERS: (id: string) => `/movies/${id}/watch-providers`,
    GET_TRENDING: '/movies/trending',
  },

  // Auth
  AUTH: {
    LOGIN: '/login',        // Ruta web
    LOGOUT: '/logout',      // Ruta web
    REGISTER: '/register',  // Ruta web
    USER: '/api/user',      // Ruta API
  }
};

// Helper para obtener el token CSRF
async function initCsrf(): Promise<void> {
  if (csrfInitialized) return;
  
  try {
    const response = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Error obteniendo CSRF token: ${response.status} - ${await response.text()}`);
    }
    
    csrfInitialized = true;

  } catch (error) {
    console.error('[API] Error inicializando CSRF:', error);
    throw error;
  }
}

// Estado del token CSRF
let csrfInitialized = false;

// Helper para hacer peticiones a la API
export async function fetchFromAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    // Asegurarnos de tener el token CSRF
    await initCsrf();

    const isApiRoute = url.startsWith('/api');
    const baseUrl = isApiRoute ? API_BASE_URL : BACKEND_URL;
    const fullUrl = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
    
    // Realizar la petición
    const response = await fetch(fullUrl, {
      ...options,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(options.headers || {}),
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Error en la respuesta: ${response.status} - ${errorText}`);
      throw new Error(`Error en la respuesta: ${response.status} - ${errorText}`);
    }
    
    return await response.json();

  } catch (error) {
    console.error('[API] Error en fetchFromAPI:', error);
    throw error;
  }
}

// Interfaces para las respuestas de la API
interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    password: string;
    created_at: string;
  };
}

interface UserResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  password: string;
  created_at: string;
}

export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetchFromAPI<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  async register(userData: {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<AuthResponse> {
    const response = await fetchFromAPI<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

  async logout(): Promise<void> {
    await fetchFromAPI(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });

    // Eliminar el token al hacer logout
    localStorage.removeItem('token');
  },

  async getUser(): Promise<UserResponse> {
    return fetchFromAPI<UserResponse>(API_ENDPOINTS.AUTH.USER);
  }
};