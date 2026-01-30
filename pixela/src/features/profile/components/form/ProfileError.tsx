import { FiAlertTriangle } from 'react-icons/fi';
import clsx from 'clsx';
import { ProfileErrorProps } from "@/features/profile/types/profileTypes";

/**
 * Estilos constantes para el componente ProfileError
 */
const STYLES = {
  container: 'flex flex-col items-center justify-center p-12 bg-black/20 backdrop-blur-sm rounded-2xl',
  icon: 'w-16 h-16 text-red-500 mb-4',
  title: 'text-2xl font-bold text-white mb-2',
  message: 'text-gray-400 text-center mb-6 max-w-md',
  button: clsx(
    'px-6 py-3 bg-pixela-accent hover:bg-pixela-accent/90',
    'text-white rounded-xl font-medium',
    'transition-all duration-200',
    'shadow-lg shadow-pixela-accent/20'
  )
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
export const ProfileError = ({ 
  message = DEFAULT_ERROR_MESSAGE 
}: ProfileErrorProps) => {
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