
import { FiSettings, FiUsers } from 'react-icons/fi';
import { TabNavigationButton } from './TabNavigationButton';
import { FaRegBookmark, FaRegComments } from 'react-icons/fa';
import { ProfileTabsProps } from '@/features/profile/types/tabs';



/**
 * Componente de pestañas de perfil
 * @param {ProfileTabsProps} props - Props del componente
 * @returns {JSX.Element} Componente ProfileTabs
 */
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