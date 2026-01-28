'use client';

import { create } from 'zustand';
import { authAPI } from '@/api/auth/auth';
import { UserResponse } from '@/api/auth/types';

const AUTH_TIMEOUT_MS = 2000;
const LOGOUT_TIMEOUT_MS = 1500;
const CLEANUP_DELAY_MS = 2000;
const FORCE_LOGOUT_KEY = 'forceLogout';

const createAuthTimeout = <T>(
  promise: Promise<T>, 
  timeoutMs: number, 
  errorMessage: string
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    )
  ]);
};

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
    set({ isLoading: true, error: null });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FORCE_LOGOUT_KEY);
    }
    
    try {
      const user = await createAuthTimeout(
        authAPI.getUser(),
        AUTH_TIMEOUT_MS,
        'Authentication timeout'
      );
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await createAuthTimeout(
        authAPI.logout(),
        LOGOUT_TIMEOUT_MS,
        'Logout timeout'
      );
    } catch (error) {
      // Log error solo en desarrollo
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
