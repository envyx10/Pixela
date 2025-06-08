import { memo } from 'react';    
import clsx from 'clsx';
import { TrendingButtonProps } from '@/features/trending/types/components';  

/**
 * Constantes de estilo para los botones de tendencias
 */
const STYLES = {
  base: 'relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 min-w-[120px] flex-1',
  active: 'text-pixela-dark bg-pixela-accent shadow-lg shadow-pixela-accent/20',
  inactive: 'text-white/80 hover:text-white'
} as const;

/**
 * Componente que renderiza un botón para la sección de tendencias
 * @param {TrendingButtonProps} props - Props del componente
 * @returns {JSX.Element} Botón estilizado
 */
export const TrendingButton = memo(({ 
  isActive, 
  children, 
  className = '',
  ...props 
}: TrendingButtonProps) => {
  const buttonClasses = clsx(
    STYLES.base,
    isActive ? STYLES.active : STYLES.inactive,
    className
  );

  return (
    <button 
      className={buttonClasses}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </button>
  );
});

TrendingButton.displayName = 'TrendingButton'; 