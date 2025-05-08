import { API_ENDPOINTS } from "../shared/apiEndpoints";
import { fetchFromAPI } from "../shared/apiHelpers";
import { User } from "./types";

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