import { ReactNode } from 'react';
import clsx from 'clsx';

interface SliderNavButtonProps {
  icon: ReactNode;
  onClick: () => void;
  direction: 'prev' | 'next';
  ariaLabel: string;
  className?: string;
}

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
        'absolute z-20 top-1/2 -translate-y-1/2',
        direction === 'prev' ? 'left-5' : 'right-5',
        'w-[50px] h-[50px] rounded-full',
        'flex items-center justify-center bg-pixela-dark/40 text-pixela-light',
        'border-2 border-pixela-accent/50 backdrop-blur-md shadow-lg transition-all duration-400',
        'opacity-70 hover:opacity-100 hover:scale-110 hover:bg-pixela-accent/80 hover:border-white/70',
        'focus:outline-none focus:ring-2 focus:ring-pixela-accent/40 embla-btn-pulse',
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}; 