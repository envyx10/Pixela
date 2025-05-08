// Usuario
export interface User {
    user_id: number;
    name: string;
    email: string;
    photo_url: string;
    is_admin: boolean;
    password?: string;
    created_at: string;
    updated_at: string;
}