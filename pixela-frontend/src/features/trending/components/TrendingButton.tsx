import { type ButtonHTMLAttributes, memo } from 'react';

/**
 * Constantes de estilo para los botones de tendencias
 */
const BUTTON_STYLES = {
  base: 'relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300',
  active: 'text-pixela-dark bg-pixela-accent shadow-lg shadow-pixela-accent/20',
  inactive: 'text-white/80 hover:text-white'
} as const;

/**
 * Props para el componente TrendingButton
 * Extiende las props nativas de un botón HTML
 * @property {boolean} isActive - Indica si el botón está activo
 * @property {React.ReactNode} children - Contenido del botón
 */
interface TrendingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

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
  const buttonClasses = [
    BUTTON_STYLES.base,
    isActive ? BUTTON_STYLES.active : BUTTON_STYLES.inactive,
    className
  ].filter(Boolean).join(' ');

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