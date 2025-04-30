'use client';

import { User } from '@/features/profile/types/user';
import { FiUser, FiUsers, FiMail, FiCalendar, FiShield, FiEdit } from 'react-icons/fi';

interface ProfileInfoProps {
  user: User;
  onEdit: () => void;
}

export const ProfileInfo = ({ user, onEdit }: ProfileInfoProps) => {
  // Formatear la fecha de registro si está disponible
  const formatDate = (date?: string) => {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="profile-info">
      <div className="profile-info__header">
        <h2 className="profile-info__title">
          Detalles de la cuenta
        </h2>
        <button 
          onClick={onEdit}
          className="profile-info__edit-button"
        >
          <FiEdit />
          <span>Editar</span>
        </button>
      </div>

      <div className="profile-info__content">
        <div className="profile-info__field">
          <p className="profile-info__label">Nombre</p>
          <div className="profile-info__value">
            <FiUser className="profile-info__icon" />
            <span>{user.name}</span>
          </div>
        </div>

        <div className="profile-info__field">
          <p className="profile-info__label">Apellidos</p>
          <div className="profile-info__value">
            <FiUsers className="profile-info__icon" />
            <span>{user.lastname || 'No especificado'}</span>
          </div>
        </div>
        
        <div className="profile-info__field">
          <p className="profile-info__label">Correo electrónico</p>
          <div className="profile-info__value">
            <FiMail className="profile-info__icon" />
            <span>{user.email}</span>
          </div>
        </div>
        
        <div className="profile-info__field">
          <p className="profile-info__label">Fecha de registro</p>
          <div className="profile-info__value">
            <FiCalendar className="profile-info__icon" />
            <span>{formatDate(user.created_at)}</span>
          </div>
        </div>
        
        {user.is_admin !== undefined && (
          <div className="profile-info__field">
            <p className="profile-info__label">Tipo de cuenta</p>
            <div className="profile-info__value">
              <FiShield className="profile-info__icon" />
              <span>{user.is_admin ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 