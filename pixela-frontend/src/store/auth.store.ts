'use client';

import { create } from 'zustand';
import { API_BASE_URL } from '@/config/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
}

// URL de la API
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Importante para enviar/recibir cookies
      });

      if (response.ok) {
        const data = await response.json();
        set({ isAuthenticated: true, user: data.user });
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        set({ isAuthenticated: true, user: data.user || data });
      } else {
        set({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      // No cambiar el estado en caso de error de red
    }
  },

  logout: () => {
    // Redirigir a la ruta de logout del backend
    window.location.replace(`${API_URL}/frontend-logout`);
    
    // Actualizar el estado local
    set({ isAuthenticated: false, user: null });
  }
})); 