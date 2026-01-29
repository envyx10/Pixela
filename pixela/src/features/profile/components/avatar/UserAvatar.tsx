'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { UserAvatarProps, AvatarSize } from '@/features/profile/types/avatar';

/**
 * Estilos del componente
 */
const STYLES = {
  container: 'flex flex-col items-center w-full',
  innerContainer: 'rounded-full overflow-hidden border-2 border-pixela-accent bg-pixela-dark-secondary shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-[0_4px_12px_rgba(236,27,105,0.2)] mb-4',
  image: 'w-full h-full object-cover',
  placeholder: 'w-full h-full flex items-center justify-center bg-pixela-dark-secondary text-white font-bold',
  sizes: {
    sm: 'w-20 h-20 [&_.user-avatar__placeholder]:text-2xl',
    md: 'w-[120px] h-[120px] [&_.user-avatar__placeholder]:text-5xl',
    lg: 'w-40 h-40 [&_.user-avatar__placeholder]:text-6xl',
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