import { type ButtonHTMLAttributes } from 'react';

interface TrendingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: React.ReactNode;
}

export const TrendingButton = ({ isActive, children, ...props }: TrendingButtonProps) => {
  return (
    <button 
      className={`relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
        isActive 
          ? 'text-pixela-dark bg-pixela-accent shadow-lg shadow-pixela-accent/20' 
          : 'text-white/80 hover:text-white'
      }`}
      aria-pressed={isActive}
      {...props}
    >
      {children}
    </button>
  );
}; 