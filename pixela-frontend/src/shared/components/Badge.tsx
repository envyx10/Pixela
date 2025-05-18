import clsx from 'clsx';

const STYLES = {
  base: 'text-xs font-bold px-2.5 py-1.5 rounded-md',
  position: {
    'top-left': 'absolute top-3 left-3 z-10',
    'top-right': 'absolute top-3 right-3 z-10',
    'bottom-left': 'absolute bottom-3 left-3 z-10',
    'bottom-right': 'absolute bottom-3 right-3 z-10',
    'none': ''
  },
  variant: {
    primary: 'bg-pixela-accent text-pixela-light',
    secondary: 'bg-pixela-dark text-pixela-light',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-pixela-dark',
    danger: 'bg-red-500 text-white'
  }
} as const;

type BadgePosition = keyof typeof STYLES.position;
type BadgeVariant = keyof typeof STYLES.variant;

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  position?: BadgePosition;
  className?: string;
}

/**
 * Componente Badge que muestra una etiqueta con diferentes estilos y posiciones
 * @param {BadgeProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente Badge
 */
export const Badge = ({
  label,
  variant = 'primary',
  position = 'none',
  className = ''
}: BadgeProps) => {
  return (
    <div 
      className={clsx(
        STYLES.base,
        STYLES.position[position],
        STYLES.variant[variant],
        className
      )}
    >
      {label}
    </div>
  );
};

export default Badge; 