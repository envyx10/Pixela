import { ReactNode } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

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
    <div className="input-field">
      <label htmlFor={name} className="input-field__label">
        {labelText}
      </label>
      <div className="input-field__icon-container">
        {icon}
      </div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`input-field__input ${error ? 'input-field__input--error' : ''}`}
        {...register}
      />
      <div className="input-field__highlight"></div>
      {error && (
        <p className="input-field__error-message">
          {error.message || "Este campo es requerido"}
        </p>
      )}
      {helperText && !error && (
        <p className="input-field__helper-text">{helperText}</p>
      )}
    </div>
  );
}; 