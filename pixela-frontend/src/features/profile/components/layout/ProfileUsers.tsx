import React, { useEffect, useState } from 'react';
import { usersAPI } from '@/api/users/users';
import { User } from '@/api/users/types';
import { FiLoader, FiAlertCircle, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';

export const ProfileUsers = () => {
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
  }, []);

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
              <div className="grid grid-cols-3 gap-4 w-full">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1 block">Nombre</label>
                  <input
                    type="text"
                    value={editingUser?.name || ''}
                    onChange={(e) => handleEditChange('name', e.target.value)}
                    className="w-full bg-[#1a1a1a]/70 border border-transparent rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#ec1b69]/40 focus:bg-[#1a1a1a]/80 transition-all duration-200 placeholder:text-gray-500/40"
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1 block">Email</label>
                  <input
                    type="email"
                    value={editingUser?.email || ''}
                    onChange={(e) => handleEditChange('email', e.target.value)}
                    className="w-full bg-[#1a1a1a]/70 border border-transparent rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#ec1b69]/40 focus:bg-[#1a1a1a]/80 transition-all duration-200 placeholder:text-gray-500/40"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs text-gray-400 mb-1 block">Rol</label>
                  <select
                    value={editingUser?.is_admin ? 'true' : 'false'}
                    onChange={(e) => handleEditChange('is_admin', e.target.value === 'true')}
                    className="w-full bg-[#1a1a1a]/70 border border-transparent rounded-md px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#ec1b69]/40 focus:bg-[#1a1a1a]/80 transition-all duration-200 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ec1b69' stroke-opacity='0.4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: '1rem',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <option value="true">Administrador</option>
                    <option value="false">Usuario</option>
                  </select>
                </div>
              </div>
            ) : (
              <>
                <span className="font-semibold text-white">{user.name}</span>
                <span className="text-gray-400">{user.email}</span>
                <span className={`text-xs py-1 px-3 rounded-md w-fit font-medium mt-1 ${user.is_admin ? 'bg-[#ec1b69]/10 text-[#ec1b69] border border-[#ec1b69]/20' : 'bg-gray-800/60 text-gray-400 border border-gray-700/50'}`}>
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