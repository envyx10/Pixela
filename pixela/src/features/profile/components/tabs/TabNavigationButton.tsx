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
      className={`profile-tabs__button ${isActive ? 'profile-tabs__button--active' : ''}`}
    >
      <div className="profile-tabs__button-content">
        <span className="profile-tabs__icon">{icon}</span>
        <span className="profile-tabs__label">{label}</span>
      </div>
    </button>
  );
}; 