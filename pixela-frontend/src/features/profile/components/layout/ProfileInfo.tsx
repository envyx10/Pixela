'use client';

import type { FC } from 'react';
import type { UserResponse } from '@/api/auth/types';
import { FiUser, FiMail, FiCalendar, FiShield, FiEdit } from 'react-icons/fi';
import clsx from 'clsx';

/**
 * Estilos constantes para el componente ProfileInfo
 */
const STYLES = {
  container: 'profile-info',
  header: 'profile-info__header',
  title: 'profile-info__title',
  editButton: clsx(
    'profile-info__edit-button',
    'flex items-center gap-2',
    'text-gray-400 hover:text-white',
    'transition-colors duration-200'
  ),
  content: 'profile-info__content',
  field: 'profile-info__field',
  label: 'profile-info__label',
  value: clsx(
    'profile-info__value',
    'flex items-center gap-3',
    'text-gray-300'
  ),
  icon: 'profile-info__icon text-gray-500'
} as const;

/**
 * Props para el componente ProfileInfo
 * @interface ProfileInfoProps
 */
interface ProfileInfoProps {
  /** Datos del usuario */
  user: UserResponse;
  /** Función a ejecutar al hacer clic en editar */
  onEdit: () => void;
}

/**
 * Componente que muestra la información del perfil del usuario
 * @param {ProfileInfoProps} props - Props del componente
 * @returns {JSX.Element} Componente ProfileInfo
 */
export const ProfileInfo: FC<ProfileInfoProps> = ({ user, onEdit }) => {
  /**
   * Formatea una fecha en formato localizado
   * @param {string} [date] - Fecha a formatear
   * @returns {string} Fecha formateada o mensaje de no disponible
   */
  const formatDate = (date?: string): string => {
    if (!date) return 'No disponible';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h2 className={STYLES.title}>
          Detalles de la cuenta
        </h2>
        <button 
          onClick={onEdit}
          className={STYLES.editButton}
          title="Editar perfil"
        >
          <FiEdit />
          <span>Editar</span>
        </button>
      </div>

      <div className={STYLES.content}>
        <div className={STYLES.field}>
          <p className={STYLES.label}>Username</p>
          <div className={STYLES.value}>
            <FiUser className={STYLES.icon} />
            <span>{user.name}</span>
          </div>
        </div>
        
        <div className={STYLES.field}>
          <p className={STYLES.label}>Correo electrónico</p>
          <div className={STYLES.value}>
            <FiMail className={STYLES.icon} />
            <span>{user.email}</span>
          </div>
        </div>
        
        <div className={STYLES.field}>
          <p className={STYLES.label}>Fecha de registro</p>
          <div className={STYLES.value}>
            <FiCalendar className={STYLES.icon} />
            <span>{formatDate(user.created_at)}</span>
          </div>
        </div>
        
        {user.is_admin !== undefined && (
          <div className={STYLES.field}>
            <p className={STYLES.label}>Tipo de cuenta</p>
            <div className={STYLES.value}>
              <FiShield className={STYLES.icon} />
              <span>{user.is_admin ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 