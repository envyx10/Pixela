'use client';

import { useState, useEffect } from 'react';
import { UserResponse } from '@/api/auth/types';
import { User } from '@/api/users/types';
import { ProfileFormData } from '@/features/profile/types/profileTypes';
import { authAPI } from '@/api/auth/auth';
import { usersAPI } from '@/api/users/users';
import { useAuthStore } from '@/stores/useAuthStore';
import { ProfileFavorites } from '../components/layout/ProfileFavorites';
import { ProfileReviews } from '../components/layout/ProfileReviews';
import { ProfileUsers } from '../components/layout/ProfileUsers';
import {
  ProfileLoader,
  ProfileError,
  ProfileTabs,
  ContentPanel,
  UserAvatar,
  ProfileInfo,
  UpdateProfileForm
} from '@/features/profile/components';
import { FiLoader } from 'react-icons/fi';
import { UserCreateModal } from '../components/form/UserCreateModal';
import { clsx } from 'clsx';
import { TabType } from '@/features/profile/types/tabs';
import { ProfileClientProps } from '@/features/profile/types/profileTypes';

const STYLES = {
  // Contenedores principales
  container: 'min-h-screen bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] pt-32 pb-8 px-4',
  content: 'mt-6',
  profileContainer: 'max-w-7xl mx-auto',
  headerContainer: 'relative mb-6',
  
  // Títulos y texto
  title: 'text-3xl md:text-4xl font-bold text-white mb-2 font-outfit',
  welcome: 'text-gray-400 mb-6 text-base',
  welcomeAccent: 'font-medium text-pixela-accent',
  
  // Secciones de perfil
  profileSection: 'w-full',
  profileGrid: 'grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start',
  avatarColumn: (scrolled: boolean) => clsx(
    'flex flex-col items-center text-center',
    'lg:sticky lg:top-8',
    'transition-all duration-300',
    scrolled && 'lg:scale-95'
  ),
  infoColumn: 'lg:col-span-2',
  
  // Avatar
  avatarName: 'text-2xl font-bold text-white mt-4 font-outfit',
  avatarRole: 'text-gray-400 mt-1 font-outfit',
  
  // Botones
  addUserButton: 'px-4 py-1.5 flex items-center justify-center rounded-md bg-pixela-accent text-white text-sm font-medium hover:bg-pixela-accent/90 transition-colors',
  
  // Pantalla de redirección
  loadingContainer: 'fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] flex flex-col items-center justify-center z-40 p-8 text-pixela-primary',
  redirectContent: 'text-center max-w-lg',
  redirectIconContainer: 'mb-6 flex justify-center',
  redirectIcon: 'w-16 h-16 bg-pixela-accent rounded-full flex items-center justify-center shadow-lg',
  redirectIconSvg: 'w-8 h-8 text-white',
  redirectTitle: 'text-2xl font-bold text-pixela-accent mb-4',
  redirectMessage: 'bg-pixela-accent/10 border border-pixela-accent/30 rounded-lg p-6 mb-6 backdrop-blur-sm',
  redirectMessageHeader: 'flex items-center justify-center mb-3',
  redirectMessageIcon: 'w-6 h-6 text-pixela-accent mr-2',
  redirectMessageTitle: 'text-pixela-accent font-medium',
  redirectMessageText: 'text-gray-300 text-sm leading-relaxed',
  redirectLoader: 'flex items-center justify-center text-gray-400',
  redirectLoaderIcon: 'w-5 h-5 mr-2 animate-spin',
  redirectLoaderText: 'text-sm',
  
  // Notificaciones
  notification: 'fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in backdrop-blur-sm border',
  notificationInline: 'absolute top-0 right-0 px-4 py-3 rounded-lg shadow-sm flex items-center gap-2 border max-w-sm',
  notificationSuccess: 'bg-pixela-accent/90 border-pixela-accent/50 text-white',
  notificationError: 'bg-red-500/90 border-red-400/50 text-white',
  notificationIcon: 'w-5 h-5 flex-shrink-0',
  notificationText: 'max-w-sm font-medium',
  notificationCloseButton: 'ml-2 hover:opacity-70 transition-opacity flex-shrink-0 p-1 rounded',
  notificationCloseButtonSuccess: 'hover:bg-pixela-accent/30',
  notificationCloseButtonError: 'hover:bg-red-600/30',
  notificationCloseIcon: 'w-4 h-4',
  
  // Legacy (mantener compatibilidad)
  loadingSpinner: 'w-8 h-8 mb-4 animate-spin',
  loadingText: 'text-lg font-semibold'
} as const;

/**
 * Componente de perfil del cliente
 * @param {ProfileClientProps} props - Props del componente
 * @returns {JSX.Element} Componente ProfileClient
 */
const ProfileClient = ({ user: initialUser }: ProfileClientProps) => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserResponse>(initialUser);
  const [redirecting, setRedirecting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.replace('http://localhost:3000');  // TODO: Cambiar a la URL de producción
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [redirecting]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleTabChange = (tab: TabType) => setActiveTab(tab);
  const handleEditProfile = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSubmitProfile = async (data: ProfileFormData) => {
    try {
      const userData: Partial<UserResponse> = {
        user_id: user.user_id,
        name: data.name,
        email: data.email,
        is_admin: user.is_admin,
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
      };
      
      // Manejar photo_url: enviar el nuevo valor o mantener el actual
      userData.photo_url = data.photo_url !== undefined ? data.photo_url : user.photo_url;
      
      // Solo añadir password si el usuario la ha escrito
      if (data.password && data.password.trim()) {
        userData.password = data.password;
      }

      const updatedUser = await usersAPI.update(userData as UserResponse);
      const userToSet = 'user' in updatedUser ? updatedUser.user : updatedUser;

      // Si se cambió la contraseña, redirigir al login por seguridad
      if (data.password && data.password.trim()) {
        setRedirecting(true);
        return;
      }

      // Para cambios que no incluyen contraseña, actualizar normalmente
      setUser(userToSet as UserResponse);
      // Actualizar también el store global para que el navbar se actualice
      updateUser(userToSet as UserResponse);
      setIsEditing(false);

      // Mostrar notificación de éxito para cambios sin contraseña
      setSuccessMessage('¡Perfil actualizado correctamente!');

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      
      // Solo mostrar notificaciones para errores del servidor, no de validación del formulario
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          setSuccessMessage('Error: El email ya está en uso o es inválido.');
        } else if (error.message.includes('validation') || error.message.includes('password')) {
          // Los errores de validación se muestran directamente en los inputs del formulario
          console.log('Error de validación manejado por el formulario');
        } else {
          setSuccessMessage(`Error: ${error.message}`);
        }
      } else {
        setSuccessMessage('Error al actualizar el perfil. Inténtalo de nuevo.');
      }
    }
  };

  const handleUserUpdated = (updatedUser: User) => {
    if (updatedUser.user_id === user.user_id) {
      const userResponse: UserResponse = {
        ...user,
        ...updatedUser,
        password: updatedUser.password || ''
      };
      setUser(userResponse);
      // Actualizar también el store global para que el navbar se actualice
      updateUser(userResponse);
    }
    setRefreshUsers(r => !r);
  };

  // Componente de notificación
  const NotificationMessage = ({ inline = false }: { inline?: boolean }) => {
    if (!successMessage) return null;
    
    const isError = successMessage.toLowerCase().includes('error');
    
    return (
      <div className={`${inline ? STYLES.notificationInline : STYLES.notification} ${
        isError ? STYLES.notificationError : STYLES.notificationSuccess
      }`}>
        {isError ? (
          <svg className={STYLES.notificationIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className={STYLES.notificationIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <span className={STYLES.notificationText}>{successMessage}</span>
        <button 
          onClick={() => setSuccessMessage(null)}
          className={`${STYLES.notificationCloseButton} ${
            isError ? STYLES.notificationCloseButtonError : STYLES.notificationCloseButtonSuccess
          }`}
          aria-label="Cerrar notificación"
        >
          <svg className={STYLES.notificationCloseIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  if (redirecting) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.redirectContent}>
          {/* Icono de éxito */}
          <div className={STYLES.redirectIconContainer}>
            <div className={STYLES.redirectIcon}>
              <svg className={STYLES.redirectIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Título principal */}
          <h2 className={STYLES.redirectTitle}>
            ¡Contraseña actualizada correctamente!
          </h2>
          
          {/* Mensaje explicativo */}
          <div className={STYLES.redirectMessage}>
            <div className={STYLES.redirectMessageHeader}>
              <svg className={STYLES.redirectMessageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className={STYLES.redirectMessageTitle}>Por tu seguridad</span>
            </div>
            <p className={STYLES.redirectMessageText}>
              Cuando cambias tu contraseña, cerramos tu sesión automáticamente para proteger tu cuenta. 
              Te redirigimos a la página principal para que puedas iniciar sesión con tu nueva contraseña.
            </p>
          </div>
          
          {/* Indicador de carga */}
          <div className={STYLES.redirectLoader}>
            <FiLoader className={STYLES.redirectLoaderIcon} />
            <span className={STYLES.redirectLoaderText}>Redirigiendo en unos segundos...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={STYLES.container}>
      <div className={STYLES.profileContainer}>
        <div className={STYLES.headerContainer}>
          <h1 className={STYLES.title}>Mi Cuenta</h1>
          <NotificationMessage inline />
        </div>
        <p className={STYLES.welcome}>
          ¡Bienvenido/a, <span className={STYLES.welcomeAccent}>{user.name}</span>! Aquí puedes gestionar tu perfil y preferencias.
        </p>
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isAdmin={user.is_admin ?? false}
        />
        <div className={STYLES.content}>
          {activeTab === 'profile' && !isEditing && (
            <div className={STYLES.profileSection}>
              <div className={STYLES.profileGrid}>
                <div className={STYLES.avatarColumn(scrolled)}>
                  <UserAvatar
                    profileImage={user.photo_url}
                    name={user.name}
                  />
                  <h3 className={STYLES.avatarName}>{user.name}</h3>
                  <p className={STYLES.avatarRole}>
                    {user.is_admin ? 'Administrador' : 'Usuario'}
                  </p>
                </div>
                <div className={STYLES.infoColumn}>
                  <ProfileInfo
                    user={{ ...user, user_id: user.user_id }}
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
                photo_url: user.photo_url
              }}
              onCancel={handleCancelEdit}
              onSubmit={handleSubmitProfile}
            />
          )}

          {activeTab === 'reviews' && (
            <ContentPanel title="Reseñas">
              <ProfileReviews />
            </ContentPanel>
          )}

          {activeTab === 'favorites' && (
            <ContentPanel title="Favoritos">
              <ProfileFavorites />
            </ContentPanel>
          )}

          {activeTab === 'users' && user.is_admin && (
            <ContentPanel
              title="Usuarios"
              headerAction={
                <button
                  className={STYLES.addUserButton}
                  title="Registrar nuevo usuario"
                  onClick={() => setShowCreateModal(true)}
                >
                  Agregar nuevo usuario
                </button>
              }
            >
              <UserCreateModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onUserCreated={() => {
                  setRefreshUsers(r => !r);
                  setShowCreateModal(false);
                }}
              />
              <ProfileUsers 
                refresh={refreshUsers} 
                onUserUpdated={handleUserUpdated}
              />
            </ContentPanel>
          )}
        </div>
      </div>
    </main>
  );
};

/**
 * Función para obtener los datos del usuario
 * @returns {Promise<UserResponse>} Datos del usuario
 */
async function getUserData(): Promise<UserResponse> {
  try {
    const response = await authAPI.getUser() as any;
    if (!response) throw new Error('No se pudieron obtener los datos del usuario');

    // Manejar respuesta si viene envuelta en un objeto 'user' (común en NextAuth API routes)
    const userData = response.user || response;

    return {
      user_id: userData.user_id || userData.id || 0,
      name: userData.name || 'Usuario',
      email: userData.email || '',
      photo_url: userData.photo_url || userData.image || '',
      is_admin: userData.is_admin || false,
      password: userData.password || '',
      created_at: userData.created_at || new Date().toISOString(),
      updated_at: userData.updated_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
}

/**
 * Página de perfil del cliente
 * @returns {JSX.Element} Componente ProfilePage
 */
export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch {
        setError('No se pudieron cargar los datos del usuario. Por favor, intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <ProfileLoader />;
  if (error) return <ProfileError message={error} />;
  if (!user) return <ProfileError message="No se encontraron datos del usuario." />;

  return <ProfileClient user={user} />;
}