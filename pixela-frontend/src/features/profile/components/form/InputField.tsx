import { ReactNode } from 'react';
import type { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

/**
 * Estilos constantes para el componente InputField
 */
const STYLES = {
  container: 'input-field mb-1',
  label: 'input-field__label mb-0.5',
  iconContainer: 'input-field__icon-container',
  input: (hasError: boolean) => clsx(
    'input-field__input',
    hasError && 'input-field__input--error'
  ),
  errorMessage: 'input-field__error-message mt-0.5 text-xs',
  helperText: clsx(
    'input-field__helper-text',
    'mt-0.5 text-[0.7rem] italic font-light',
    'text-gray-400/70 pl-0.5',
    'bg-transparent border-none shadow-none'
  )
} as const;

/**
 * Props para el componente InputField
 * @interface InputFieldProps
 */
interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  icon: ReactNode;
  error?: FieldError;
  helperText?: string;
  labelText?: string;
}

/**
 * Componente de campo de entrada con integración de react-hook-form
 * @param {InputFieldProps} props - Props del componente
 * @returns {JSX.Element} Componente InputField
 */
export const InputField: FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  register,
  icon,
  error,
  helperText,
  labelText = placeholder,
}) => {
  return (
    <div className={STYLES.container}>
      <label htmlFor={name} className={STYLES.label}>
        {labelText}
      </label>
      <div className={STYLES.iconContainer}>
        {icon}
      </div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={STYLES.input(!!error)}
        style={{ boxShadow: 'none' }}
        {...register}
      />
      <div className="input-field__highlight" style={{ display: 'none' }} />
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