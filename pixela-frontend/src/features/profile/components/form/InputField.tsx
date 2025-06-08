
import clsx from 'clsx';
import { InputFieldProps } from '@/features/profile/types/form';

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