import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";
import { AuthResponse, UserResponse } from "./types";

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

        if (response.token) {
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

            // Limpiar cookies con dominio correcto
            document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'pixela_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = `XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
            document.cookie = `pixela_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;

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