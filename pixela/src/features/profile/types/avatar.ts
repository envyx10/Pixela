/**
 * Tamaños disponibles para el avatar
 * @type {AvatarSize}
 */
export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * Props del componente UserAvatar
 * @interface UserAvatarProps
 * @property {string} profileImage - URL de la imagen del perfil
 * @property {string} name - Nombre del usuario
 * @property {AvatarSize} size - Tamaño del avatar
 * @property {string} className - Clase CSS adicional
 */
export interface UserAvatarProps {
  profileImage?: string;
  name: string;
  size?: AvatarSize;
  className?: string;
} 