import clsx from 'clsx';
import { TabNavigationButtonProps } from "@/features/profile/types/tabs";


/**
 * Componente de botón de navegación de pestañas
 * @param {TabNavigationButtonProps} props - Props del componente
 * @returns {JSX.Element} Componente TabNavigationButton
 */
export const TabNavigationButton = ({
  label,
  icon,
  isActive,
  onClick,
}: TabNavigationButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={clsx(
        'relative px-3 py-2 sm:px-4 sm:py-2',
        'text-sm sm:text-base whitespace-nowrap',
        'transition-colors duration-200',
        'after:content-[""] after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:bg-pixela-accent after:transition-all after:duration-200',
        isActive 
          ? 'text-white font-bold after:w-full' 
          : 'text-gray-400 hover:text-white after:w-0 hover:after:w-full'
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-base flex items-center justify-center">{icon}</span>
        <span className="text-[15px]">{label}</span>
      </div>
    </button>
  );
}; 