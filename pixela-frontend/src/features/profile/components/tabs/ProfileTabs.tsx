import { FiSettings, FiClock, FiList, FiStar } from 'react-icons/fi';
import { TabNavigationButton } from './TabNavigationButton';

type TabType = 'profile' | 'history' | 'watchlist' | 'favorites';

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="profile-tabs">
      <TabNavigationButton
        label="Perfil"
        icon={<FiSettings />}
        isActive={activeTab === 'profile'}
        onClick={() => onTabChange('profile')}
      />
      
      <TabNavigationButton
        label="Historial"
        icon={<FiClock />}
        isActive={activeTab === 'history'}
        onClick={() => onTabChange('history')}
      />
      
      <TabNavigationButton
        label="Lista de seguimiento"
        icon={<FiList />}
        isActive={activeTab === 'watchlist'}
        onClick={() => onTabChange('watchlist')}
      />
      
      <TabNavigationButton
        label="Favoritos"
        icon={<FiStar />}
        isActive={activeTab === 'favorites'}
        onClick={() => onTabChange('favorites')}
      />
    </div>
  );
}; 