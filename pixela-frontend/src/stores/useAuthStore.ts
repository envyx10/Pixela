'use client';

import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  surname:string;
  email: string;
  password: string;
  created_at: string
  updated_at: string
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({

  isAuthenticated: false,
  user: null,

  checkAuth: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const user = await response.json();
        set({ isAuthenticated: true, user });

      } else {
        set({ isAuthenticated: false, user: null });
      }

    } catch (error) {
      set({ isAuthenticated: false, user: null });
    }
  },

  logout: async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      set({ isAuthenticated: false, user: null });
      window.location.href = '/';

    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

})); 