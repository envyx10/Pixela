import { ReactNode, ChangeEvent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

/**
 * Props para el componente FormInput
 * @interface FormInputProps
 * @property {string} type - Tipo de input (text, email, password, etc.)
 * @property {string} name - Nombre del campo
 * @property {string} value - Valor actual del input
 * @property {(e: ChangeEvent<HTMLInputElement>) => void} onChange - Función que maneja los cambios
 * @property {string} placeholder - Texto de placeholder
 * @property {boolean} [required] - Indica si el campo es requerido
 * @property {ReactNode} icon - Icono a mostrar junto al input
 * @property {string} [helperText] - Texto de ayuda opcional
 */
export interface FormInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon: ReactNode;
  helperText?: string;
} 

/**
 * Props para el componente InputField
 * @interface InputFieldProps
 * @property {string} type - Tipo de input (text, email, password, etc.)
 * @property {string} name - Nombre del campo
 * @property {string} placeholder - Texto de placeholder
 * @property {UseFormRegisterReturn} register - Función de registro de react-hook-form
 * @property {ReactNode} icon - Icono a mostrar junto al input
 * @property {FieldError} error - Error del campo
 * @property {string} helperText - Texto de ayuda opcional
 * @property {string} labelText - Texto del label
 */
export interface InputFieldProps {
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
 * Interfaz para los datos de creación de usuario
 * @interface CreateUserData
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {string} password - Contraseña del usuario
 * @property {string} password_confirmation - Confirmación de la contraseña
 * @property {boolean} is_admin - Indica si el usuario es administrador
 * @property {string} photo_url - URL de la foto de perfil
 */
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: boolean;
  photo_url: string;
}

/**
 * Interfaz para el error de la API
 * @interface ApiError
 * @property {Object} [response] - Respuesta de error de la API
 * @property {Object} [response.data] - Datos de la respuesta de error
 * @property {Object} [response.data.errors] - Errores específicos
 * @property {string[]} [response.data.errors.email] - Errores relacionados con el email
 * @property {Object} [data] - Datos de error alternativos
 * @property {Object} [data.errors] - Errores específicos alternativos
 * @property {string[]} [data.errors.email] - Errores de email alternativos
 * @property {string} [message] - Mensaje de error general
 */
export interface ApiError {
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
 * Props para el componente UserCreateModal
 * @interface UserCreateModalProps
 */
export interface UserCreateModalProps {
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
export interface UserForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  is_admin: string;
}