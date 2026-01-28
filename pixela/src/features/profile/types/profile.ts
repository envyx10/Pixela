import { UserResponse } from '@/api/auth/types';

/**
 * Datos del formulario de actualización de perfil
 * @interface UpdateProfileData
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {string} [photo_url] - URL de la foto de perfil (opcional)
 */
export interface UpdateProfileData {
  name: string;
  email: string;
  photo_url?: string;
}

/**
 * Props del componente UserProfileCard
 * @interface UserProfileCardProps
 * @property {UserResponse} user - Datos del usuario
 */
export interface UserProfileCardProps {
  user: UserResponse;
} 