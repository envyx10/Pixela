import { FavoriteWithDetails } from "./types";

import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";
import { Favorite } from "./types";

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