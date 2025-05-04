import { AuthResponse, UserResponse } from './apiTypes';
import { API_ENDPOINTS } from './apiEndpoints';
import { fetchFromAPI } from './apiHelpers';

// Opciones por defecto para las peticiones fetch
export const DEFAULT_FETCH_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  cache: 'no-store' as RequestCache
};

export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetchFromAPI<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      //localStorage.setItem('token', response.token);
      localStorage.removeItem('forceLogout');
    }

    return response;
  },

  async register(userData: {
    name: string;
    surname: string;
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
      //localStorage.removeItem('token');
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