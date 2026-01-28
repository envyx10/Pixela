'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { UserAvatarProps, AvatarSize } from '@/features/profile/types/avatar';

/**
 * Estilos del componente
 */
const STYLES = {
  container: 'user-avatar',
  innerContainer: 'user-avatar__container',
  image: 'user-avatar__image',
  placeholder: 'user-avatar__placeholder',
  sizes: {
    sm: 'user-avatar__container--sm',
    md: 'user-avatar__container--md',
    lg: 'user-avatar__container--lg',
  } as Record<AvatarSize, string>,
} as const;

/**
 * Componente que muestra el avatar de un usuario
 * @param props - Props del componente
 * @returns Componente de avatar
 */
export const UserAvatar = ({ 
  profileImage, 
  name,
  size = 'md',
  className = ''
}: UserAvatarProps) => {
  return (
    <div className={STYLES.container}>
      <div className={clsx(
        STYLES.innerContainer,
        STYLES.sizes[size],
        className
      )}>
        {profileImage ? (
          <Image   
            src={profileImage} 
            alt={name} 
            className={STYLES.image}
            width={160}
            height={160}
            priority
            loading="eager"
          />
        ) : (
          <div className={STYLES.placeholder}>
            {name ? name.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </div>
    </div>
  );
}; 