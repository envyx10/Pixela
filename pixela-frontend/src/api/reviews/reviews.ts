import { Review, CreateReview } from "./types";
import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";

// API para reseñas
export const reviewsAPI = {
    async list(): Promise<Review[]> {
        const response = await fetchFromAPI<{ success: boolean; data: Review[] }>(API_ENDPOINTS.REVIEWS.LIST);
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