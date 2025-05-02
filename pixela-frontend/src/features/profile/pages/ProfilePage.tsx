'use client';

import { useState, useEffect } from 'react';
import { User } from '@/features/profile/types/user';
import { ProfileFormData } from '@/features/profile/types/profileTypes';
import { authAPI } from '@/config/api';

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

// Componente del cliente que maneja la edición y navegación de pestañas
const ProfileClient = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Añadimos efecto de scroll para la animación, solo en el cliente
  useEffect(() => {
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
                    profileImage={user.photo_url} 
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
                surname: user.surname,
                email: user.email,
                photo_url: user.photo_url
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
};

// Función para obtener datos de usuario desde la API
async function getUserData(): Promise<User> {
  try {
    const userData = await authAPI.getUser();
    if (!userData) {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
    return userData;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
}

// No podemos usar async/await en componentes con la directiva 'use client'
// por lo que necesitamos otra estructura
export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Utilizamos useEffect para cargar los datos en el cliente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
        setError('No se pudieron cargar los datos del usuario. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProfileLoader />;
  }

  if (error) {
    return <ProfileError message={error} />;
  }

  if (!user) {
    return <ProfileError message="No se encontraron datos del usuario." />;
  }

  return <ProfileClient user={user} />;
} 