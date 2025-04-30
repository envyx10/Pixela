'use client';

import { create } from 'zustand';
import { authAPI } from '@/config/api';

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  created_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      localStorage.removeItem('forceLogout');
      const user = await authAPI.getUser();
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      console.error('Error checking auth:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await authAPI.logout();
      
      // Actualizar el estado inmediatamente
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: null 
      });

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error al cerrar sesión'
      });
      throw error; // Propagar el error para manejarlo en el componente
    }
  },
}));
