'use client';

import { useState } from 'react';
import { UserResponse } from '@/api/auth/types';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';
import { ProfileInfo } from '@/features/profile/components/layout/ProfileInfo';
import { UpdateProfileForm } from '@/features/profile/components/form/UpdateProfileForm';

interface UserProfileCardProps {
  user: UserResponse;
}

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSubmitProfile = (data: any) => {
    console.log('Datos actualizados:', data);
    // Aquí iría la lógica para actualizar el perfil en el backend
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Columna de avatar */}
            <div className="flex flex-col items-center text-center pt-4">
              <UserAvatar 
                profileImage={user.photo_url} 
                name={user.name} 
              />
              <h3 className="text-2xl font-bold text-white mt-4 font-outfit">{user.name}</h3>
              <p className="text-gray-400 mt-1 font-outfit">
                {user.is_admin ? 'Administrador' : 'Usuario'}
              </p>
            </div>

            {/* Columna de información */}
            <div className="lg:col-span-2">
              <ProfileInfo 
                user={user} 
                onEdit={handleEditProfile} 
              />
            </div>
          </div>
        </div>
      ) : (
        <UpdateProfileForm
          initialData={{
            name: user.name,
            email: user.email,
            photo_url: user.photo_url
          }}
          onCancel={handleCancelEdit}
          onSubmit={handleSubmitProfile}
        />
      )}
    </>
  );
}; 