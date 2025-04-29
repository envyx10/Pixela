'use client';

import { useEffect, useState } from 'react';
import { User } from '@/features/profile/types/user';
import { ProfileFormData } from '@/features/profile/types/profileTypes';

import { 
  ProfileLoader,
  ProfileError,
  ProfileTabs,
  ContentPanel,
  UserAvatar,
  ProfileInfo,
  UpdateProfileForm
} from '@/features/profile/components';

// Importación de los estilos SASS
import '@/styles/profile/main.scss';

// Definimos el tipo para las pestañas
type TabType = 'profile' | 'history' | 'watchlist' | 'favorites';

export default function ProfilePage() {
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    //TODO Aquí iría la lógica para obtener los datos del usuario
    //INFO Por ahora, simulamos datos de ejemplo
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Usuario Ejemplo',
        email: 'usuario@ejemplo.com',
        created_at: new Date().toISOString(),
        is_admin: false,
        profile_image: undefined
      });
      setLoading(false);
    }, 1000);
    
    // Añadimos efecto de scroll para la animación
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejador para cambiar de pestaña
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Manejador para iniciar la edición
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Manejador para cancelar la edición
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // Manejador para enviar el formulario
  const handleSubmitProfile = (data: ProfileFormData) => {
    console.log('Datos actualizados:', data);
    // Aquí iría la lógica para actualizar el perfil en el backend
    setIsEditing(false);
  };

  if (loading) {
    return <ProfileLoader />;
  }

  if (!user) {
    return <ProfileError />;
  }

  return (
    <main className="profile-page">
      <div className="profile-page__container">
        <h1 className="profile-page__title">Mi Cuenta</h1>
        
        {/* Tabs de navegación */}
        <ProfileTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        {/* Contenido de las pestañas */}
        <div className="profile-page__content">
          {activeTab === 'profile' && !isEditing && (
            <div className="profile-page__profile-section">
              <div className="profile-page__profile-grid">
                {/* Columna de avatar */}
                <div className={`profile-page__avatar-column avatar-scroll-effect ${scrolled ? 'scrolled' : ''}`}>
                  <UserAvatar 
                    profileImage={user.profile_image} 
                    name={user.name} 
                  />
                  <h3 className="user-avatar__name">{user.name}</h3>
                  <p className="user-avatar__role">
                    {user.is_admin ? 'Administrador' : 'Usuario'}
                  </p>
                </div>

                {/* Columna de información */}
                <div className="profile-page__info-column">
                  <ProfileInfo 
                    user={user} 
                    onEdit={handleEditProfile} 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && isEditing && (
            <UpdateProfileForm
              initialData={{
                name: user.name,
                email: user.email,
                profile_image: user.profile_image
              }}
              onCancel={handleCancelEdit}
              onSubmit={handleSubmitProfile}
            />
          )}
          
          {activeTab === 'history' && (
            <ContentPanel 
              title="Historial de Visualización" 
              isEmpty={true} 
              emptyMessage="No hay elementos en tu historial de visualización."
            />
          )}
          
          {activeTab === 'watchlist' && (
            <ContentPanel 
              title="Lista de Seguimiento" 
              isEmpty={true} 
              emptyMessage="No hay elementos en tu lista de seguimiento."
            />
          )}
          
          {activeTab === 'favorites' && (
            <ContentPanel 
              title="Favoritos" 
              isEmpty={true} 
              emptyMessage="No hay elementos en tus favoritos."
            />
          )}
        </div>
      </div>
    </main>
  );
} 