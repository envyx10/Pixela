import { useState } from 'react';
import clsx from 'clsx';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputFieldProps } from '@/features/profile/types/form';

/**
 * Estilos constantes para el componente InputField
 */
const STYLES = {
  container: 'input-field mb-2',
  label: 'input-field__label mb-0.5',
  iconContainer: 'input-field__icon-container',
  input: (hasError: boolean) => clsx(
    'input-field__input',
    hasError && 'input-field__input--error'
  ),
  errorMessage: 'input-field__error-message mt-0.5 text-xs',
  helperText: clsx(
    'input-field__helper-text',
    'mt-1.5 mb-1 text-[0.75rem] italic font-light',
    'text-gray-400/70 pl-0.5',
    'bg-transparent border-none shadow-none',
    'leading-relaxed'
  ),
  // Nuevos estilos para el botón del ojo
  passwordContainer: 'relative',
  eyeButton: clsx(
    'absolute right-3 top-1/2 transform -translate-y-1/2',
    'text-gray-400 hover:text-pixela-accent transition-colors',
    'cursor-pointer z-10 p-1 rounded',
    'hover:bg-gray-700/20'
  ),
  eyeIcon: 'w-4 h-4'
} as const;


/**
 * Componente de campo de entrada con integración de react-hook-form
 * @param {InputFieldProps} props - Props del componente
 * @returns {JSX.Element} Componente InputField
 */
export const InputField = ({
  type,
  name,
  placeholder,
  register,
  icon,
  error,
  helperText,
  labelText = placeholder,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={STYLES.container}>
      <label htmlFor={name} className={STYLES.label}>
        {labelText}
      </label>
      <div className={isPasswordField ? STYLES.passwordContainer : undefined}>
        <div className={STYLES.iconContainer}>
          {icon}
        </div>
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={STYLES.input(!!error)}
          style={{ boxShadow: 'none' }}
          {...register}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={STYLES.eyeButton}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <FiEyeOff className={STYLES.eyeIcon} />
            ) : (
              <FiEye className={STYLES.eyeIcon} />
            )}
          </button>
        )}
        <div className="input-field__highlight" style={{ display: 'none' }} />
      </div>
      {error && (
        <p className={STYLES.errorMessage}>
          {error.message || "Este campo es requerido"}
        </p>
      )}
      {helperText && !error && (
        <p className={STYLES.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
}; 