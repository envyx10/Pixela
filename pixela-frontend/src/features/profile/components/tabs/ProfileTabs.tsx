import { FiSettings, FiList, FiHeart, FiEdit, FiUsers } from 'react-icons/fi';
import { TabNavigationButton } from './TabNavigationButton';

type TabType = 'profile' | 'reviews' | 'favorites' | 'users';

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
      
      {/* <TabNavigationButton
        label="Historial"
        icon={<FiClock />}
        isActive={activeTab === 'history'}
        onClick={() => onTabChange('history')}
      /> */}
      
      {/* <TabNavigationButton
        label="Lista de seguimiento"
        icon={<FiList />}
        isActive={activeTab === 'watchlist'}
        onClick={() => onTabChange('watchlist')}
      /> */}

      <TabNavigationButton
        label="Reseñas"
        icon={<FiEdit />}
        isActive={activeTab === 'reviews'}
        onClick={() => onTabChange('reviews')}
      />
      
      <TabNavigationButton
        label="Favoritos"
        icon={<FiHeart />}
        isActive={activeTab === 'favorites'}
        onClick={() => onTabChange('favorites')}
      />

      <TabNavigationButton
        label="Usuarios"
        icon={<FiUsers />}
        isActive={activeTab === 'users'}
        onClick={() => onTabChange('users')}
      />
    </div>
  );
}; 