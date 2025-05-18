'use client';

import { useState } from 'react';
import { UserResponse } from '@/api/auth/types';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';
import { ProfileInfo } from '@/features/profile/components/layout/ProfileInfo';
import { UpdateProfileForm } from '@/features/profile/components/form/UpdateProfileForm';

/**
 * Datos del formulario de actualización de perfil
 */
interface UpdateProfileData {
  name: string;
  email: string;
  photo_url?: string;
}

/**
 * Props del componente UserProfileCard
 */
interface UserProfileCardProps {
  /** Datos del usuario */
  user: UserResponse;
}

/**
 * Estilos del componente
 */
const STYLES = {
  container: 'max-w-4xl mx-auto',
  grid: 'grid grid-cols-1 lg:grid-cols-3 gap-12 items-center',
  avatarColumn: 'flex flex-col items-center text-center pt-4',
  name: 'text-2xl font-bold text-white mt-4 font-outfit',
  role: 'text-gray-400 mt-1 font-outfit',
  infoColumn: 'lg:col-span-2',
} as const;

/**
 * Componente que muestra la tarjeta de perfil de usuario
 * @param props - Props del componente
 * @returns Componente de tarjeta de perfil
 */
export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitProfile = (data: UpdateProfileData) => {
    console.log('Datos actualizados:', data);
    // Aquí iría la lógica para actualizar el perfil en el backend
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <UpdateProfileForm
        initialData={{
          name: user.name,
          email: user.email,
          photo_url: user.photo_url
        }}
        onCancel={handleCancelEdit}
        onSubmit={handleSubmitProfile}
      />
    );
  }

  return (
    <div className={STYLES.container}>
      <div className={STYLES.grid}>
        {/* Columna de avatar */}
        <div className={STYLES.avatarColumn}>
          <UserAvatar 
            profileImage={user.photo_url} 
            name={user.name} 
          />
          <h3 className={STYLES.name}>{user.name}</h3>
          <p className={STYLES.role}>
            {user.is_admin ? 'Administrador' : 'Usuario'}
          </p>
        </div>

        {/* Columna de información */}
        <div className={STYLES.infoColumn}>
          <ProfileInfo 
            user={user} 
            onEdit={handleEditProfile} 
          />
        </div>
      </div>
    </div>
  );
}; 