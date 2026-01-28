import { Review, CreateReview } from "./types";
import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";

/** 
 * API para reseñas 
 * Esta funcion se encarga de realizar las operaciones CRUD para las reseñas
 * @namespace reviewsAPI
 * @description API para reseñas
 */
export const reviewsAPI = {
    async list(): Promise<Review[]> {
        const response = await fetchFromAPI<{ success: boolean; data: Review[] }>(API_ENDPOINTS.REVIEWS.LIST);
        return response.data;
    },

    async getByMedia(tmdbId: number, itemType: 'movie' | 'series'): Promise<Review[]> {
        const endpoint = API_ENDPOINTS.REVIEWS.BY_MEDIA
            .replace(':tmdbId', String(tmdbId))
            .replace(':itemType', itemType);
        const response = await fetchFromAPI<{ success: boolean; data: Review[] }>(endpoint);
        return response.data;
    },

    async add(review: CreateReview): Promise<Review> {
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