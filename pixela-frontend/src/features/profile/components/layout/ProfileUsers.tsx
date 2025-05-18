import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { usersAPI } from '@/api/users/users';
import type { User } from '@/api/users/types';
import { FiLoader, FiAlertCircle, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';
import clsx from 'clsx';

/**
 * Mensajes de error constantes
 */
const ERROR_MESSAGES = {
  LOAD: 'No se pudieron cargar los usuarios.',
  DELETE: 'No se pudo eliminar el usuario',
  UPDATE: 'No se pudo actualizar el usuario'
} as const;

/**
 * Estilos constantes para el componente ProfileUsers
 */
const STYLES = {
  container: 'space-y-1',
  loadingContainer: 'flex items-center justify-center p-8',
  loadingIcon: 'w-8 h-8 text-pixela-primary animate-spin',
  errorContainer: 'flex items-center justify-center p-8 text-red-500',
  errorIcon: 'w-6 h-6 mr-2',
  emptyContainer: 'flex flex-col items-center justify-center p-8 text-gray-400',
  emptyIcon: 'w-12 h-12 mb-4',
  emptyText: 'text-lg font-outfit',
  userItem: 'flex items-center bg-pixela-dark-opacity/50 pt-2 px-4 rounded gap-4',
  avatarContainer: 'min-w-[32px] max-w-[32px] flex justify-center',
  contentContainer: 'flex flex-col justify-center flex-2 pl-5',
  editForm: 'grid grid-cols-3 gap-4 w-full',
  formGroup: 'flex flex-col',
  label: 'text-xs text-gray-400 mb-1 block',
  input: clsx(
    'w-full bg-[#1a1a1a]/70 border border-transparent rounded-md',
    'px-3 py-1.5 text-white text-sm',
    'focus:outline-none focus:border-[#ec1b69]/40 focus:bg-[#1a1a1a]/80',
    'transition-all duration-200 placeholder:text-gray-500/40'
  ),
  select: clsx(
    'w-full bg-[#1a1a1a]/70 border border-transparent rounded-md',
    'px-3 py-1.5 text-white text-sm',
    'focus:outline-none focus:border-[#ec1b69]/40 focus:bg-[#1a1a1a]/80',
    'transition-all duration-200 appearance-none cursor-pointer'
  ),
  selectIcon: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ec1b69' stroke-opacity='0.4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundSize: '1rem',
    backgroundPosition: 'right 0.75rem center',
    backgroundRepeat: 'no-repeat'
  },
  userName: 'font-semibold text-white',
  userEmail: 'text-gray-400',
  userRole: (isAdmin: boolean) => clsx(
    'text-xs py-1 px-3 rounded-md w-fit font-medium mt-1',
    isAdmin
      ? 'bg-[#ec1b69]/10 text-[#ec1b69] border border-[#ec1b69]/20'
      : 'bg-gray-800/60 text-gray-400 border border-gray-700/50'
  ),
  actionsContainer: 'flex items-center gap-2 ml-auto',
  actionButton: (color: string) => clsx(
    'p-2 transition-colors duration-200',
    color
  ),
  actionIcon: 'w-5 h-5'
} as const;

/**
 * Props para el componente ProfileUsers
 * @interface ProfileUsersProps
 */
interface ProfileUsersProps {
  /** Indica si se debe refrescar la lista de usuarios */
  refresh: boolean;
}

/**
 * Componente que muestra la lista de usuarios
 * @param {ProfileUsersProps} props - Props del componente
 * @returns {JSX.Element} Componente ProfileUsers
 */
export const ProfileUsers: FC<ProfileUsersProps> = ({ refresh }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    usersAPI.list()
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch(() => setError(ERROR_MESSAGES.LOAD))
      .finally(() => setLoading(false));
  }, [refresh]);

  /**
   * Maneja la eliminación de un usuario
   * @param {number} userId - ID del usuario a eliminar
   */
  const handleDelete = async (userId: number) => {
    setDeletingId(userId);
    try {
      await usersAPI.delete(userId);
      const refreshedUsers = await usersAPI.list();
      setUsers(refreshedUsers);
    } catch {
      setError(ERROR_MESSAGES.DELETE);
    } finally {
      setDeletingId(null);
    }
  };

  /**
   * Inicia la edición de un usuario
   * @param {User} user - Usuario a editar
   */
  const handleStartEdit = (user: User) => {
    setEditingId(user.user_id);
    setEditingUser({ ...user });
  };

  /**
   * Cancela la edición de un usuario
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingUser(null);
  };

  /**
   * Guarda los cambios de un usuario
   */
  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const userToUpdate = { ...editingUser };
      delete userToUpdate.password;
      
      await usersAPI.update(userToUpdate);
      const refreshedUsers = await usersAPI.list();
      setUsers(Array.isArray(refreshedUsers) ? refreshedUsers : []);
      setEditingId(null);
      setEditingUser(null);
    } catch {
      setError(ERROR_MESSAGES.UPDATE);
    }
  };

  /**
   * Maneja los cambios en los campos de edición
   * @param {keyof User} field - Campo a actualizar
   * @param {string | boolean} value - Nuevo valor
   */
  const handleEditChange = (field: keyof User, value: string | boolean) => {
    if (!editingUser) return;
    setEditingUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (loading) {
    return (
      <div className={STYLES.loadingContainer}>
        <FiLoader className={STYLES.loadingIcon} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={STYLES.errorContainer}>
        <FiAlertCircle className={STYLES.errorIcon} />
        <span>{error}</span>
      </div>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className={STYLES.emptyContainer}>
        <FiAlertCircle className={STYLES.emptyIcon} />
        <p className={STYLES.emptyText}>No hay usuarios.</p>
      </div>
    );
  }

  return (
    <div className={STYLES.container}>
      {users.map(user => (
        <div key={user.user_id} className={STYLES.userItem}>
          <div className={STYLES.avatarContainer}>
            <UserAvatar profileImage={user.photo_url} name={user.name} size="sm" />
          </div>
          <div className={STYLES.contentContainer}>
            {editingId === user.user_id ? (
              <div className={STYLES.editForm}>
                <div className={STYLES.formGroup}>
                  <label className={STYLES.label}>Nombre</label>
                  <input
                    type="text"
                    value={editingUser?.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className={STYLES.input}
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className={STYLES.formGroup}>
                  <label className={STYLES.label}>Email</label>
                  <input
                    type="email"
                    value={editingUser?.email || ''}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    className={STYLES.input}
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className={STYLES.formGroup}>
                  <label className={STYLES.label}>Rol</label>
                  <select
                    value={editingUser?.is_admin ? 'true' : 'false'}
                    onChange={(e) => handleEditChange('is_admin', e.target.value === 'true')}
                    className={STYLES.select}
                    style={STYLES.selectIcon}
                  >
                    <option value="true">Administrador</option>
                    <option value="false">Usuario</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <span className={STYLES.userName}>{user.name}</span>
                <span className={STYLES.userEmail}>{user.email}</span>
                <span className={STYLES.userRole(user.is_admin)}>
                  {user.is_admin ? 'Administrador' : 'Usuario'}
                </span>
              </>
            )}
          </div>
          <div className={STYLES.actionsContainer}>
            {editingId === user.user_id ? (
              <>
                <button
                  className={STYLES.actionButton('text-green-500 hover:text-green-400')}
                  title="Guardar cambios"
                  onClick={handleSaveEdit}
                >
                  <FiCheck className={STYLES.actionIcon} />
                </button>
                <button
                  className={STYLES.actionButton('text-gray-400 hover:text-white')}
                  title="Cancelar edición"
                  onClick={handleCancelEdit}
                >
                  <FiX className={STYLES.actionIcon} />
                </button>
              </>
            ) : (
              <>
                <button
                  className={STYLES.actionButton('text-gray-400 hover:text-[#ec1b69]')}
                  title="Editar usuario"
                  onClick={() => handleStartEdit(user)}
                >
                  <FiEdit className={STYLES.actionIcon} />
                </button>
                <button
                  className={STYLES.actionButton('text-gray-400 hover:text-[#ec1b69]')}
                  title="Eliminar usuario"
                  onClick={() => handleDelete(user.user_id)}
                  disabled={deletingId === user.user_id}
                >
                  {deletingId === user.user_id ? (
                    <FiLoader className={STYLES.actionIcon} />
                  ) : (
                    <FaTrash className={STYLES.actionIcon} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};