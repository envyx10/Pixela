import { FavoriteWithDetails, Favorite, CreateFavorite } from "./types";

import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";

// API para favoritos
export const favoritesAPI = {
    async listWithDetails(): Promise<FavoriteWithDetails[]> {
      const response = await fetchFromAPI<{ success: boolean; data: FavoriteWithDetails[] }>(API_ENDPOINTS.FAVORITES.DETAILS);
      return response.data;
    },
  
    async addFavorite(favorite: CreateFavorite): Promise<Favorite> {
      console.log('Enviando datos a la API:', favorite);
      return fetchFromAPI<Favorite>(API_ENDPOINTS.FAVORITES.ADD, {
        method: 'POST',
        body: JSON.stringify({
          tmdb_id: favorite.tmdb_id,
          item_type: favorite.item_type
        }),
      });
    },
  
    async deleteFavorite(favoriteId: number): Promise<void> {
      await fetchFromAPI(API_ENDPOINTS.FAVORITES.DELETE.replace(':id', String(favoriteId)), {
        method: 'DELETE',
      });
    }
  };