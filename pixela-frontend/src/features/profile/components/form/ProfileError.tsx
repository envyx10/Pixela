import type { FC } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { ProfileErrorProps } from "@/features/profile/types/profileTypes";

/**
 * Estilos constantes para el componente ProfileError
 */
const STYLES = {
  container: 'profile-error',
  icon: 'profile-error__icon',
  title: 'profile-error__title',
  message: 'profile-error__message',
  button: 'profile-error__button'
} as const;

/**
 * Mensaje de error por defecto
 */
const DEFAULT_ERROR_MESSAGE = "No se pudo cargar la información del usuario.";

/**
 * Componente que muestra un mensaje de error con opción de reintentar
 * @param {ProfileErrorProps} props - Props del componente
 * @returns {JSX.Element} Componente ProfileError
 */
export const ProfileError: FC<ProfileErrorProps> = ({ 
  message = DEFAULT_ERROR_MESSAGE 
}) => {
  const handleRetry = () => window.location.reload();

  return (
    <div className={STYLES.container}>
      <FiAlertTriangle className={STYLES.icon} />
      <h2 className={STYLES.title}>Ha ocurrido un error</h2>
      <p className={STYLES.message}>{message}</p>
      <button 
        className={STYLES.button} 
        onClick={handleRetry}
        type="button"
        aria-label="Intentar de nuevo"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}; 