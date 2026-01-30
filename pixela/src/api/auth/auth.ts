import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";
import { AuthResponse, UserResponse } from "./types";

const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  FORCE_LOGOUT: 'forceLogout',
} as const;

const COOKIE_NAMES = {
  XSRF_TOKEN: 'XSRF-TOKEN',
  SESSION: 'pixela_session',
} as const;

const clearAuthCookies = (): void => {
  if (typeof document === 'undefined') return;
  
  const expireDate = 'Thu, 01 Jan 1970 00:00:00 UTC';
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  
  Object.values(COOKIE_NAMES).forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=${expireDate}; path=/;`;
    document.cookie = `${cookieName}=; expires=${expireDate}; path=/; domain=${domain}`;
  });
};

/**
 * API para autenticación
 * @namespace authAPI
 * @description API para autenticación
 */
export const authAPI = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await fetchFromAPI<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.token && typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_STORAGE_KEYS.FORCE_LOGOUT);
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

        if (response.token && typeof window !== 'undefined') {
            localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, response.token);
        }

        return response;
    },

    async logout(): Promise<void> {
        await fetchFromAPI(API_ENDPOINTS.AUTH.LOGOUT, {
            method: 'POST',
        });

        clearAuthCookies();
    },

    async getUser(): Promise<UserResponse> {
        if (typeof window !== 'undefined' && localStorage.getItem(AUTH_STORAGE_KEYS.FORCE_LOGOUT)) {
            localStorage.removeItem(AUTH_STORAGE_KEYS.FORCE_LOGOUT);
            throw new Error('Session closed');
        }
        
        return fetchFromAPI<UserResponse>(API_ENDPOINTS.AUTH.USER);
    }
};