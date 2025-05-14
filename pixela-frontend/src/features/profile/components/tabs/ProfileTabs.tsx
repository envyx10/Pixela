
import { FiSettings, FiUsers } from 'react-icons/fi';
import { TabNavigationButton } from './TabNavigationButton';
import { FaRegBookmark, FaRegComments } from 'react-icons/fa';

type TabType = 'profile' | 'reviews' | 'favorites' | 'users';

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isAdmin: boolean;
}

export const ProfileTabs = ({ activeTab, onTabChange, isAdmin }: ProfileTabsProps) => {
  return (
    <div className="profile-tabs">
      <TabNavigationButton
        label="Perfil"
        icon={<FiSettings />}
        isActive={activeTab === 'profile'}
        onClick={() => onTabChange('profile')}
      />

      <TabNavigationButton
        label="Reseñas"
        icon={<FaRegComments />}
        isActive={activeTab === 'reviews'}
        onClick={() => onTabChange('reviews')}
      />
      
      <TabNavigationButton
        label="Favoritos"
        icon={<FaRegBookmark />}
        isActive={activeTab === 'favorites'}
        onClick={() => onTabChange('favorites')}
      />

      {isAdmin && (
        <TabNavigationButton
          label="Usuarios"
          icon={<FiUsers />}
          isActive={activeTab === 'users'}
          onClick={() => onTabChange('users')}
        />
      )}
    </div>
  );
}; 