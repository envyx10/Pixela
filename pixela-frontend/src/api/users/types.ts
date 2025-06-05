/**
 * Interfaz para el usuario
 * @interface User
 * @property {number} user_id - ID del usuario
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {string} photo_url - URL de la foto del usuario
 * @property {boolean} is_admin - Indica si el usuario es administrador
 * @property {string} password - Contraseña del usuario
 */
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