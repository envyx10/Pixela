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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-xl w-full max-w-md border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Registrar nuevo usuario</h2>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className="text-gray-400 hover:text-white transition-colors"
            title="Cerrar"
          >
            <FiX className="w-6 h-6 hover:text-pixela-accent"/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-white/10 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent"
              placeholder="Nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-white/10 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-white/10 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent"
              placeholder="Contraseña"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Confirmar contraseña</label>
            <input
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-white/10 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:border-pixela-accent"
              placeholder="Confirmar contraseña"
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Administrador</label>
            <select
              name="is_admin"
              value={form.is_admin}
              onChange={handleChange}
              className="w-full bg-[#252525] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-pixela-accent"
            >
              <option value="false">Usuario</option>
              <option value="true">Administrador</option>
            </select>
          </div>
          {error && <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => { resetForm(); onClose(); }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-pixela-accent hover:bg-pixela-accent/90 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 