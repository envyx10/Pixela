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
    <div className="input-field" style={{ marginBottom: '4px' }}>
      <label htmlFor={name} className="input-field__label" style={{ marginBottom: '2px' }}>
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
        style={{ boxShadow: 'none' }}
        {...register}
      />
      <div className="input-field__highlight" style={{ display: 'none' }}></div>
      {error && (
        <p className="input-field__error-message" style={{ marginTop: '2px', fontSize: '0.75rem' }}>
          {error.message || "Este campo es requerido"}
        </p>
      )}
      {helperText && !error && (
        <p className="input-field__helper-text" style={{ 
          marginTop: '2px', 
          fontSize: '0.7rem', 
          fontStyle: 'italic', 
          fontWeight: 300,
          color: 'rgba(156, 163, 175, 0.7)',
          paddingLeft: '2px',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }}>
          {helperText}
        </p>
      )}
    </div>
  );
}; 