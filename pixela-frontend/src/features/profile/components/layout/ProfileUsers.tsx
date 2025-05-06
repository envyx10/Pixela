import React, { useEffect, useState } from 'react';
import { usersAPI } from '@/config/api';
import { User } from '@/config/apiTypes';
import { FiLoader, FiAlertCircle, FiEdit, FiCheck, FiX } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { UserAvatar } from '@/features/profile/components/avatar/UserAvatar';
import { useAuthStore } from '@/stores/useAuthStore';

export const ProfileUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const loggedUser = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

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

  // Redirección tras cambio de contraseña propio
  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.href = (process.env.NEXT_PUBLIC_BACKEND_URL + '/login');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [redirecting]);

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
  const handleEdit = (user: User) => {
    setEditingId(user.user_id);
    setEditForm({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Guardar edición
  const handleSaveEdit = async () => {
    if (!editForm.user_id) return;
    setSavingId(editForm.user_id);
    try {
      await usersAPI.update({
        ...editForm,
        photo_url: users.find(u => u.user_id === editForm.user_id)?.photo_url || '',
        created_at: users.find(u => u.user_id === editForm.user_id)?.created_at || '',
        updated_at: new Date().toISOString(),
      } as User);
      // Si el usuario logueado cambia su propia contraseña, mostrar mensaje y redirigir
      // El uso de loggedUser.user_id es para que el usuario logueado pueda cambiar su propia contraseña
      // Si se usa loggedUser.id, el usuario logueado no podrá cambiar su propia contraseña, no aparecerá el campo de contraseña
      if (loggedUser && (loggedUser.user_id || loggedUser.id) === editForm.user_id && editForm.password) {
        await logout();
        setRedirecting(true);
        return;
      }
      const refreshedUsers = await usersAPI.list();
      setUsers(refreshedUsers);
      setEditingId(null);
      setEditForm({});
    } catch (err: any) {
      // Si el error es 401, redirige al login de Laravel
      if (err?.status === 401) {
        window.location.href = (process.env.NEXT_PUBLIC_BACKEND_URL + '/login');
        return;
      }
      setError('No se pudo actualizar el usuario');
    } finally {
      setSavingId(null);
    }
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

  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-pixela-primary">
        <FiLoader className="w-8 h-8 mb-4 animate-spin" />
        <span className="text-lg font-semibold">Contraseña cambiada, redirigiendo al login...</span>
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
                  className="mb-1 rounded bg-[#181818] border border-gray-600 text-white p-1"
                  value={editForm.name || ''}
                  onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  disabled={savingId === user.user_id}
                  placeholder="Nombre"
                />
                <input
                  className="mb-1 rounded bg-[#181818] border border-gray-600 text-white p-1"
                  value={editForm.email || ''}
                  onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                  disabled={savingId === user.user_id}
                  placeholder="Email"
                />
                <select
                  className="mb-1 rounded bg-[#181818] border border-gray-600 text-white p-1"
                  value={editForm.is_admin ? '1' : '0'}
                  onChange={e => setEditForm(f => ({ ...f, is_admin: e.target.value === '1' }))}
                  disabled={savingId === user.user_id}
                >
                  <option value="1">Administrador</option>
                  <option value="0">Usuario</option>
                </select>
                {/* Campo de password solo para el usuario logueado */}
                {loggedUser && ((loggedUser.user_id || loggedUser.id) === user.user_id) && (
                  <input
                    type="password"
                    className="mb-1 rounded bg-[#181818] border border-gray-600 text-white p-1"
                    value={editForm.password || ''}
                    onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))}
                    disabled={savingId === user.user_id}
                    placeholder="Nueva contraseña"
                  />
                )}
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
                  className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Guardar"
                  onClick={handleSaveEdit}
                  disabled={savingId === user.user_id}
                >
                  {savingId === user.user_id ? (
                    <FiLoader className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiCheck className="w-5 h-5" />
                  )}
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Cancelar"
                  onClick={handleCancelEdit}
                  disabled={savingId === user.user_id}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 text-gray-400 hover:text-[#ec1b69] transition-colors duration-200"
                  title="Editar usuario"
                  onClick={() => handleEdit(user)}
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