'use client';

import { create } from 'zustand';
import { initCsrf, fetcher, logout as apiLogout } from '@/lib/api';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  /**
   * Inicializa CSRF y comprueba si hay sesión activa.
   */
  checkAuth: () => Promise<void>;
  /**
   * Llama a /logout y limpia el estado.
   */
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,

  checkAuth: async () => {
    set({ loading: true });
    try {
      // 1) Inicializa la cookie XSRF-TOKEN
      await initCsrf();

      // 2) Llama a /api/user con fetcher (incluye pixela_session + XSRF-TOKEN)
      const user = await fetcher<User>('/api/user');

      // 3) Si responde ok, guardamos usuario y marcamos auth=true
      set({ user, isAuthenticated: true, loading: false });

    } catch (e) {
      // Si falla (403, 401, error de red…), no está autenticado
      set({ user: null, isAuthenticated: false, loading: false });
      
    }
  },

  logout: async () => {
    try {
      // Llama al endpoint de logout que borra la cookie pixela_session
      await apiLogout();

    } catch (e) {
      console.error('Error during logout:', e);

    } finally {
      // Limpiamos siempre el estado y redirigimos al login Blade
      set({ user: null, isAuthenticated: false });
      window.location.href = '/login';

    }
  },
}));
