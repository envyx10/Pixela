import type { FC } from 'react';
import clsx from 'clsx';

/**
 * Estilos constantes para el componente ProfileLoader
 */
const STYLES = {
  container: clsx(
    'profile-loader',
    'flex flex-col items-center justify-center',
    'p-8 space-y-4'
  ),
  spinner: clsx(
    'profile-loader__spinner',
    'w-12 h-12 border-4 border-pixela-primary/20',
    'border-t-pixela-primary rounded-full',
    'animate-spin'
  ),
  text: clsx(
    'profile-loader__text',
    'text-gray-400 text-lg font-outfit'
  )
} as const;

/**
 * Componente que muestra un estado de carga para el perfil
 * @returns {JSX.Element} Componente ProfileLoader
 */
export const ProfileLoader: FC = () => {
  return (
    <div className={STYLES.container}>
      <div className={STYLES.spinner} />
      <p className={STYLES.text}>Cargando perfil...</p>
    </div>
  );
}; 