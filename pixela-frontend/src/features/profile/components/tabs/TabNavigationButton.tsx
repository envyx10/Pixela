import { ReactNode } from 'react';

interface TabNavigationButtonProps {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

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