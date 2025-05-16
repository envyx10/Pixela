import { useState } from 'react';
import { usersAPI } from '@/api/users/users';
import { FiX } from 'react-icons/fi';

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: string;
}

export const UserCreateModal = ({ isOpen, onClose, onUserCreated }: UserCreateModalProps) => {
  const [form, setForm] = useState<UserForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_admin: 'false',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (form.password !== form.password_confirmation) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }
    try {
      await usersAPI.create({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
        is_admin: form.is_admin === 'true',
      } as any);
      onUserCreated();
      onClose();
      setForm({ name: '', email: '', password: '', password_confirmation: '', is_admin: 'false' });
    } catch (err: any) {
      const emailError =
        err?.response?.data?.errors?.email?.[0] ||
        err?.data?.errors?.email?.[0] ||
        err?.message ||
        '';
    
      if (emailError && emailError.toLowerCase().includes('email')) {
        setError('Ya existe un usuario con ese email.');
      } else {
        setError('No se pudo crear el usuario.');
      }

    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      is_admin: 'false',
    });
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center">
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#141414] w-full h-30 border border-white/5 shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1A1A1A] z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Nuevo Usuario</h2>
            <p className="text-sm text-gray-400">Complete los datos para registrar un nuevo usuario</p>
          </div>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="text-gray-400 hover:text-white transition-colors"
            title="Cerrar"
          >
            <FiX className="w-6 h-6 hover:text-pixela-accent"/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Nombre</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30 transition-all duration-200"
                  placeholder="Nombre del usuario"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30 transition-all duration-200"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30 transition-all duration-200"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Confirmar contraseña</label>
                <input
                  name="password_confirmation"
                  type="password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30 transition-all duration-200"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Rol del usuario</label>
              <select
                name="is_admin"
                value={form.is_admin}
                onChange={handleChange}
                className="w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30 transition-all duration-200 [&::-ms-expand]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-calendar-picker-indicator]:hidden appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:24px_18px] bg-[right_1rem_center] bg-no-repeat pr-12 [&>option]:bg-[#1A1A1A] [&>option]:text-white [&>option]:p-4 [&>option]:hover:bg-[#252525] [&>option]:focus:bg-[#252525] [&>option]:active:bg-[#252525]"
              >
                <option value="false" className="p-4">Usuario</option>
                <option value="true" className="p-4">Administrador</option>
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center">
                <span className="flex-1">{error}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-pixela-accent hover:bg-pixela-accent/90 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pixela-accent/20"
              >
                {loading ? 'Registrando...' : 'Registrar usuario'}
              </button>
              <button
                type="button"
                onClick={() => { resetForm(); onClose(); }}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-200"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 