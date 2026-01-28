'use client';

import { create } from 'zustand';
import { authAPI } from '@/api/auth/auth';
import { UserResponse } from '@/api/auth/types';

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: UserResponse) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  updateUser: (user: UserResponse) => {
    set({ user, isAuthenticated: true });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Limpiar cualquier forceLogout residual
      localStorage.removeItem('forceLogout');
      
      // Timeout de 500ms para verificación rápida
      const authPromise = authAPI.getUser();
      const timeoutPromise = new Promise<UserResponse>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de autenticación')), 2000)
      );
      
      const user = await Promise.race([authPromise, timeoutPromise]);
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
      
      // Timeout de 3 segundos para logout
      const logoutPromise = authAPI.logout();
      const timeoutPromise = new Promise<void>((resolve) => 
        setTimeout(() => resolve(), 1500)
      );
      
      await Promise.race([logoutPromise, timeoutPromise]);

      // Actualizar el estado inmediatamente
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      // Limpiar localStorage después de logout exitoso
      setTimeout(() => {
        localStorage.removeItem('forceLogout');
      }, 2000);

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      
      // Incluso si hay error, limpiar el estado local
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null // No mostrar error en logout
      });
    }
  },
}));
