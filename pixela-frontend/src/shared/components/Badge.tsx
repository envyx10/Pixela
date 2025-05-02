import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?:   'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none';
  className?: string;
}

export const Badge = ({
  label,
  variant = 'primary',
  position = 'none',
  className = '',
}: BadgeProps) => {
  const positionClasses = {
    'top-left': 'absolute top-3 left-3 z-10',
    'top-right': 'absolute top-3 right-3 z-10',
    'bottom-left': 'absolute bottom-3 left-3 z-10',
    'bottom-right': 'absolute bottom-3 right-3 z-10',
    'none': '',
  };

  const variantClasses = {
    primary: 'bg-pixela-accent text-pixela-light',
    secondary: 'bg-pixela-dark text-pixela-light',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-pixela-dark',
    danger: 'bg-red-500 text-white',
  };

  return (
    <div 
      className={clsx(
        positionClasses[position],
        variantClasses[variant],
        'text-xs font-bold px-2.5 py-1.5 rounded-md',
        className
      )}
    >
      {label}
    </div>
  );
}; 