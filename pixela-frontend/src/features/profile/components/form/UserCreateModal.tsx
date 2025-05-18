import type { FC } from 'react';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import clsx from 'clsx';
import { usersAPI } from '@/api/users/users';
import type { User } from '@/api/users/types';

/**
 * Interfaz para los datos de creación de usuario
 */
interface CreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: boolean;
  photo_url: string;
}

/**
 * Interfaz para el error de la API
 */
interface ApiError {
  response?: {
    data?: {
      errors?: {
        email?: string[];
      };
    };
  };
  data?: {
    errors?: {
      email?: string[];
    };
  };
  message?: string;
}

/**
 * Estilos constantes para el componente UserCreateModal
 */
const STYLES = {
  overlay: 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center',
  container: 'bg-gradient-to-b from-[#1A1A1A] to-[#141414] w-full h-30 border border-white/5 shadow-2xl overflow-y-auto',
  header: 'flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#1A1A1A] z-10',
  title: 'text-2xl font-bold text-white mb-1',
  subtitle: 'text-sm text-gray-400',
  closeButton: 'text-gray-400 hover:text-white transition-colors',
  closeIcon: 'w-6 h-6 hover:text-pixela-accent',
  form: 'p-8',
  formContainer: 'max-w-4xl mx-auto space-y-6',
  grid: 'grid grid-cols-2 gap-6',
  fieldGroup: 'space-y-2',
  label: 'block text-sm font-medium text-gray-300',
  input: clsx(
    'w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3',
    'text-white placeholder-gray-500',
    'focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30',
    'transition-all duration-200'
  ),
  select: clsx(
    'w-full bg-[#252525]/50 border border-white/5 rounded-xl p-3 text-white',
    'focus:outline-none focus:border-pixela-accent/50 focus:ring-1 focus:ring-pixela-accent/30',
    'transition-all duration-200',
    '[&::-ms-expand]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-calendar-picker-indicator]:hidden',
    'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E")]',
    'bg-[length:24px_18px] bg-[right_1rem_center] bg-no-repeat pr-12',
    '[&>option]:bg-[#1A1A1A] [&>option]:text-white [&>option]:p-4',
    '[&>option]:hover:bg-[#252525] [&>option]:focus:bg-[#252525] [&>option]:active:bg-[#252525]'
  ),
  error: 'p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center',
  actions: 'flex justify-end gap-3 pt-6',
  submitButton: clsx(
    'px-6 py-2.5 bg-pixela-accent hover:bg-pixela-accent/90',
    'text-white rounded-xl font-medium transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'shadow-lg shadow-pixela-accent/20'
  ),
  cancelButton: clsx(
    'px-6 py-2.5 bg-white/5 hover:bg-white/10',
    'text-white rounded-xl font-medium transition-all duration-200'
  )
} as const;

/**
 * Props para el componente UserCreateModal
 * @interface UserCreateModalProps
 */
interface UserCreateModalProps {
  /** Indica si el modal está abierto */
  isOpen: boolean;
  /** Función para cerrar el modal */
  onClose: () => void;
  /** Función a ejecutar cuando se crea un usuario */
  onUserCreated: () => void;
}

/**
 * Datos del formulario de usuario
 * @interface UserForm
 */
interface UserForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: string;
}

/**
 * Valores iniciales del formulario
 */
const INITIAL_FORM_STATE: UserForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  is_admin: 'false',
};

/**
 * Componente modal para crear un nuevo usuario
 * @param {UserCreateModalProps} props - Props del componente
 * @returns {JSX.Element | null} Componente UserCreateModal
 */
export const UserCreateModal: FC<UserCreateModalProps> = ({ 
  isOpen, 
  onClose, 
  onUserCreated 
}) => {
  const [form, setForm] = useState<UserForm>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Maneja el cambio en los campos del formulario
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Evento de cambio
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja el envío del formulario
   * @param {React.FormEvent} e - Evento de envío
   */
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
      const userData: CreateUserData = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
        is_admin: form.is_admin === 'true',
        photo_url: '', // Valor por defecto para nuevo usuario
      };
      
      await usersAPI.create(userData as unknown as User);
      onUserCreated();
      onClose();
      setForm(INITIAL_FORM_STATE);
    } catch (err) {
      const apiError = err as ApiError;
      const emailError = apiError?.response?.data?.errors?.email?.[0] ||
                        apiError?.data?.errors?.email?.[0] ||
                        apiError?.message ||
                        '';
      
      setError(emailError.toLowerCase().includes('email') 
        ? 'Ya existe un usuario con ese email.'
        : 'No se pudo crear el usuario.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reinicia el formulario a su estado inicial
   */
  const resetForm = () => {
    setForm(INITIAL_FORM_STATE);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className={STYLES.overlay}>
      <div className={STYLES.container}>
        <div className={STYLES.header}>
          <div>
            <h2 className={STYLES.title}>Nuevo Usuario</h2>
            <p className={STYLES.subtitle}>
              Complete los datos para registrar un nuevo usuario
            </p>
          </div>
          <button
            onClick={() => { resetForm(); onClose(); }}
            className={STYLES.closeButton}
            title="Cerrar"
          >
            <FiX className={STYLES.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={STYLES.form}>
          <div className={STYLES.formContainer}>
            <div className={STYLES.grid}>
              <div className={STYLES.fieldGroup}>
                <label className={STYLES.label}>Nombre</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={STYLES.input}
                  placeholder="Nombre del usuario"
                  required
                />
              </div>
              <div className={STYLES.fieldGroup}>
                <label className={STYLES.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={STYLES.input}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className={STYLES.grid}>
              <div className={STYLES.fieldGroup}>
                <label className={STYLES.label}>Contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className={STYLES.input}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className={STYLES.fieldGroup}>
                <label className={STYLES.label}>Confirmar contraseña</label>
                <input
                  name="password_confirmation"
                  type="password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className={STYLES.input}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className={STYLES.fieldGroup}>
              <label className={STYLES.label}>Rol del usuario</label>
              <select
                name="is_admin"
                value={form.is_admin}
                onChange={handleChange}
                className={STYLES.select}
              >
                <option value="false">Usuario</option>
                <option value="true">Administrador</option>
              </select>
            </div>

            {error && (
              <div className={STYLES.error}>
                <span className="flex-1">{error}</span>
              </div>
            )}

            <div className={STYLES.actions}>
              <button
                type="submit"
                disabled={loading}
                className={STYLES.submitButton}
              >
                {loading ? 'Registrando...' : 'Registrar usuario'}
              </button>
              <button
                type="button"
                onClick={() => { resetForm(); onClose(); }}
                className={STYLES.cancelButton}
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