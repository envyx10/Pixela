// Respuesta de autenticación
export interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        surname: string;
        email: string;
        photo_url: string;
        is_admin: boolean;
        password: string;
        created_at: string;
    };
}

// Respuesta de usuario
export interface UserResponse {
    user_id: number;
    name: string;
    email: string;
    photo_url: string;
    is_admin: boolean;
    password: string;
    created_at: string;
    updated_at: string;
}