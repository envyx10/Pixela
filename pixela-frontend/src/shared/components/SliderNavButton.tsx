import { ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Direcciones posibles para el botón de navegación del slider
 */
type SliderDirection = 'prev' | 'next';

/**
 * Props para el componente SliderNavButton
 */
interface SliderNavButtonProps {

  icon: ReactNode;

  onClick: () => void;

  direction: SliderDirection;
  ariaLabel: string;
  className?: string;
}

const STYLES = {
  base: 'absolute z-20 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center',
  background: 'bg-pixela-dark/40 text-pixela-light border-2 border-pixela-accent/50 backdrop-blur-md shadow-lg',
  transitions: 'transition-all duration-400 opacity-70 hover:opacity-100 hover:scale-110',
  hover: 'hover:bg-pixela-accent/80 hover:border-white/70',
  focus: 'focus:outline-none focus:ring-2 focus:ring-pixela-accent/40 embla-btn-pulse',
  position: {
    prev: 'left-5',
    next: 'right-5',
  },
} as const;

/**
 * Botón de navegación para el slider
 * 
 * @example
 * ```tsx
 * <SliderNavButton
 *   icon={<ChevronLeftIcon />}
 *   direction="prev"
 *   onClick={() => handlePrev()}
 *   ariaLabel="Anterior"
 * />
 * ```
 */
export const SliderNavButton = ({
  icon,
  onClick,
  direction,
  ariaLabel,
  className = '',
}: SliderNavButtonProps) => {
  return (
    <button 
      className={clsx(
        STYLES.base,
        STYLES.background,
        STYLES.transitions,
        STYLES.hover,
        STYLES.focus,
        STYLES.position[direction],
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}; 