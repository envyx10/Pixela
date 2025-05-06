import { AuthResponse, UserResponse, Favorite, FavoriteWithDetails, Review, User } from './apiTypes';
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

// API para autenticación
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

// API para favoritos
export const favoritesAPI = {
  async listWithDetails(): Promise<FavoriteWithDetails[]> {
    const response = await fetchFromAPI<{ success: boolean; data: FavoriteWithDetails[] }>(API_ENDPOINTS.FAVORITES.DETAILS);
    return response.data;
  },

  async addFavorite(favorite: Favorite): Promise<Favorite> {
    return fetchFromAPI<Favorite>(API_ENDPOINTS.FAVORITES.CREATE, {
      method: 'POST',
      body: JSON.stringify(favorite),
    });
  },

  async deleteFavorite(favoriteId: number): Promise<void> {
    await fetchFromAPI(API_ENDPOINTS.FAVORITES.DELETE.replace(':id', String(favoriteId)), {
      method: 'DELETE',
    });
  }
};

// API para reseñas
export const reviewsAPI = {
  async list(): Promise<Review[]> {
    const response = await fetchFromAPI<{ success: boolean; data: Review[] }>(API_ENDPOINTS.REVIEWS.LIST);
    return response.data;
  },

  async add(review: Review): Promise<Review> {
    return fetchFromAPI<Review>(API_ENDPOINTS.REVIEWS.CREATE, {
      method: 'POST',
      body: JSON.stringify(review),
    });
  },

  async update(review: Review): Promise<Review> {
    return fetchFromAPI<Review>(API_ENDPOINTS.REVIEWS.UPDATE.replace(':id', String(review.id)), {
      method: 'PUT',
      body: JSON.stringify(review),
    });
  },

  async delete(reviewId: number): Promise<void> {
    await fetchFromAPI(API_ENDPOINTS.REVIEWS.DELETE.replace(':id', String(reviewId)), {
      method: 'DELETE',
    });
  }
};

// API para usuarios
export const usersAPI = {
  async list(): Promise<User[]> {
    const response = await fetchFromAPI<{ message: string; users: User[] }>(API_ENDPOINTS.USERS.LIST);
    return response.users;
  },

  async create(user: User): Promise<User> {
    return fetchFromAPI<User>(API_ENDPOINTS.USERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  async update(user: User): Promise<User> {
    return fetchFromAPI<User>(API_ENDPOINTS.USERS.UPDATE.replace(':id', String(user.user_id)), {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  },

  async delete(userId: number): Promise<void> {
    await fetchFromAPI(API_ENDPOINTS.USERS.DELETE.replace(':id', String(userId)), {
      method: 'DELETE',
    });
  }
};