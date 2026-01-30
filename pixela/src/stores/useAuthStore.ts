'use client';

import { create } from 'zustand';
import { useSession, signOut } from 'next-auth/react';
import { UserResponse } from '@/api/auth/types';

const CLEANUP_DELAY_MS = 2000;
const FORCE_LOGOUT_KEY = 'forceLogout';

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: UserResponse) => void;
  syncWithSession: (session: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  updateUser: (user: UserResponse) => {
    set({ user, isAuthenticated: true });
  },

  syncWithSession: (session: any) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FORCE_LOGOUT_KEY);
    }

    if (session?.user) {
      const user: UserResponse = {
        user: {
          id: parseInt(session.user.id),
          name: session.user.name || '',
          surname: '',
          email: session.user.email || '',
          isAdmin: session.user.isAdmin || false,
          photoUrl: session.user.image || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      };
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      });
    } else {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  },

  checkAuth: async () => {
    // Ahora solo sincroniza con la sesión de NextAuth
    // La llamada real se hace desde el componente con useSession
    set({ isLoading: false, error: null });
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await signOut({ redirect: false });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Logout error:', error);
      }
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      if (typeof window !== 'undefined') {
        setTimeout(() => {
          localStorage.removeItem(FORCE_LOGOUT_KEY);
        }, CLEANUP_DELAY_MS);
      }
    }
  },
}));
