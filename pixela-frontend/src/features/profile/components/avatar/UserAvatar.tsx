import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

interface UserAvatarProps {
  profileImage?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar = ({ 
  profileImage, 
  name,
  size = 'md',
  className = ''
}: UserAvatarProps) => {
  // Determinar la clase de tamaño para el avatar
  const sizeClass = `user-avatar__container--${size}`;
  
  return (
    <div className="user-avatar">
      <div className={`user-avatar__container ${sizeClass} ${className}`}>
        {profileImage ? (
          <Image   
            src={profileImage} 
            alt={name} 
            className="user-avatar__image"
            width={160}
            height={160}
          />
        ) : (
          <div className="user-avatar__placeholder">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}; 