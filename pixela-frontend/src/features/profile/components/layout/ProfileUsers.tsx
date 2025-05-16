import React, { useEffect, useState } from 'react';
import { usersAPI } from '@/api/users/users';
import { User } from '@/api/users/types';
import { FiLoader, FiAlertCircle, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';

export const ProfileUsers = ({ refresh }: { refresh: boolean }) => {
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
      .catch(() => setError('No se pudieron cargar los usuarios.'))
      .finally(() => setLoading(false));
  }, [refresh]);

  // Borrar usuario
  const handleDelete = async (userId: number) => {
    setDeletingId(userId);
    try {
      await usersAPI.delete(userId);
      const refreshedUsers = await usersAPI.list();
      setUsers(refreshedUsers);
    } catch {
      setError('No se pudo eliminar el usuario');
    } finally {
      setDeletingId(null);
    }
  };

  // Iniciar edición
  const handleStartEdit = (user: User) => {
    setEditingId(user.user_id);
    setEditingUser({ ...user });
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingUser(null);
  };

  // Guardar cambios
  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      const userToUpdate = { ...editingUser };
      delete userToUpdate.password;
      
      await usersAPI.update(userToUpdate);
      // Refrescar la lista completa de usuarios
      const refreshedUsers = await usersAPI.list();
      setUsers(Array.isArray(refreshedUsers) ? refreshedUsers : []);
      setEditingId(null);
      setEditingUser(null);
    } catch (error) {
      setError('No se pudo actualizar el usuario');
    }
  };

  // Manejar cambios en los campos de edición
  const handleEditChange = (field: keyof User, value: string | boolean) => {
    if (!editingUser) return;
    setEditingUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FiLoader className="w-8 h-8 text-pixela-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <FiAlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <FiAlertCircle className="w-12 h-12 mb-4" />
        <p className="text-lg font-outfit">No hay usuarios.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {users.map(user => (
        <div key={user.user_id} className="flex items-center bg-pixela-dark-opacity/50 pt-2 px-4 rounded gap-4">
          <div className="min-w-[32px] max-w-[32px] flex justify-center">
            <UserAvatar profileImage={user.photo_url} name={user.name} size="sm" />
          </div>
          <div className="flex flex-col justify-center flex-2 pl-5">
            {editingId === user.user_id ? (
              <>
                <input
                  type="text"
                  value={editingUser?.name || ''}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="bg-pixela-dark border border-pixela-primary/30 rounded px-2 py-1 text-white mb-1"
                />
                <input
                  type="email"
                  value={editingUser?.email || ''}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="bg-pixela-dark border border-pixela-primary/30 rounded px-2 py-1 text-white mb-1"
                />
                <select
                  value={editingUser?.is_admin ? 'true' : 'false'}
                  onChange={(e) => handleEditChange('is_admin', e.target.value === 'true')}
                  className="bg-pixela-dark border border-pixela-primary/30 rounded px-2 py-1 text-white w-fit"
                >
                  <option value="true">Administrador</option>
                  <option value="false">Usuario</option>
                </select>
              </>
            ) : (
              <>
                <span className="font-semibold text-white">{user.name}</span>
                <span className="text-gray-400">{user.email}</span>
                <span className="text-xs py-1 rounded bg-pixela-primary/20 text-pixela-primary w-fit">
                  {user.is_admin ? 'Administrador' : 'Usuario'}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            {editingId === user.user_id ? (
              <>
                <button
                  className="p-2 text-green-500 hover:text-green-400 transition-colors duration-200"
                  title="Guardar cambios"
                  onClick={handleSaveEdit}
                >
                  <FiCheck className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  title="Cancelar edición"
                  onClick={handleCancelEdit}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Editar usuario"
                  onClick={() => handleStartEdit(user)}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Eliminar usuario"
                  onClick={() => handleDelete(user.user_id)}
                  disabled={deletingId === user.user_id}
                >
                  {deletingId === user.user_id ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FaTrash className="w-5 h-5" />
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