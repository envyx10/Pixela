// URLs base
//export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_INTERNAL_URL || 'http://localhost/api';
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';


export const API_ENDPOINTS = {
  // Series
  SERIES: {
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/series/${id}`,
    LIST: `${API_BASE_URL}/api/series`,
    GET_CAST: (id: string) => `${API_BASE_URL}/api/series/${id}/cast`,
    GET_VIDEOS: (id: string) => `${API_BASE_URL}/api/series/${id}/videos`,
    GET_IMAGES: (id: string) => `${API_BASE_URL}/api/series/${id}/images`, // ✅ añadido
    GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/api/series/${id}/watch-providers`,
  },
  
  // Películas
  PELICULAS: {
    GET_BY_ID: (id: string) => `${API_BASE_URL}/api/movies/${id}`,
    LIST: `${API_BASE_URL}/api/movies`,
    GET_CAST: (id: string) => `${API_BASE_URL}/api/movies/${id}/cast`,
    GET_VIDEOS: (id: string) => `${API_BASE_URL}/api/movies/${id}/videos`,
    GET_IMAGES: (id: string) => `${API_BASE_URL}/api/movies/${id}/images`, // ✅ añadido
    GET_WATCH_PROVIDERS: (id: string) => `${API_BASE_URL}/api/movies/${id}/watch-providers`,
  },

  // Auth
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    USER: '/user',
  }

};

// Endpoints específicos
/* export const API_ENDPOINTS = {
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
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    USER: '/user',
  }
}; */

// Opciones por defecto para las peticiones fetch
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  cache: 'no-store' as RequestCache
};

// Estado del token CSRF
let csrfInitialized = false;

// Helper para obtener el token CSRF
async function initCsrf(): Promise<void> {
  if (csrfInitialized) return;
  
  try {
    console.log('Inicializando CSRF token...');
    const response = await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
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

// Helper para hacer peticiones a la API
export async function fetchFromAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    // Asegurarnos de tener el token CSRF
    await initCsrf();

    // Obtener el token CSRF
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    // Construir la URL completa
    const fullUrl = url.startsWith('http') 
      ? url 
      : `${API_URL}${url.startsWith('/') ? url : `/${url}`}`;
    
    console.log('Haciendo petición a:', fullUrl);
    
    // Realizar la petición
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
      throw new Error(`Error en la respuesta: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Respuesta recibida:', data);
    return data;

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

// Helper para eliminar cookies
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetchFromAPI<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.removeItem('forceLogout');
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
    try {
      // Primero hacer el logout en el backend
      await fetchFromAPI(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
      });
      
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.setItem('forceLogout', 'true');
      
      // Limpiar cookies con dominio correcto
      document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'pixela_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `pixela_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      
      // Forzar recarga completa para limpiar el estado
      window.location.replace('/');
    } catch (error) {
      console.error('[API] Error en logout:', error);
      throw error;
    }
  },

  async getUser(): Promise<UserResponse> {
    // Si hay un logout forzado, no intentar obtener el usuario
    if (localStorage.getItem('forceLogout')) {
      localStorage.removeItem('forceLogout');
      throw new Error('Sesión cerrada');
    }
    return fetchFromAPI<UserResponse>(API_ENDPOINTS.AUTH.USER);
  }
};