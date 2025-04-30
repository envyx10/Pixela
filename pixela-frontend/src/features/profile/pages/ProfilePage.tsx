'use client';

import { useState, useEffect } from 'react';
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
};

// Función para obtener datos de usuario (simulada pero preparada para fetch real)
async function getUserData(): Promise<User> {
  // En producción, esto sería un fetch real con next/cache
  // const res = await fetch('/api/user', { next: { revalidate: 60 } });
  // return res.json();
  
  // Por ahora simulamos la data
  return {
    id: 1,
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    created_at: new Date().toISOString(),
    is_admin: false,
    profile_image: undefined
  };
}

// No podemos usar async/await en componentes con la directiva 'use client'
// por lo que necesitamos otra estructura
export default function ProfilePage() {
  // La función getUserData se llama en el cliente
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Utilizamos useEffect para cargar los datos en el cliente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProfileLoader />;
  }

  if (!user) {
    return <ProfileError />;
  }

  return <ProfileClient user={user} />;
} 