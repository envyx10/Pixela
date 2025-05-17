'use client';

import { useState, useEffect } from 'react';
import { UserResponse } from '@/api/auth/types';
import { ProfileFormData } from '@/features/profile/types/profileTypes';
import { authAPI } from '@/api/auth/auth';
import { FavoriteWithDetails } from '@/api/favorites/types';
import { favoritesAPI } from '@/api/favorites/favorites';
import { usersAPI } from '@/api/users/users';
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

import '@/styles/profile/main.scss';

type TabType = 'profile' | 'reviews' | 'favorites' | 'users';

const ProfileClient = ({ user: initialUser }: { user: UserResponse }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserResponse>(initialUser);
  const [redirecting, setRedirecting] = useState(false);

  const [favorites, setFavorites] = useState<FavoriteWithDetails[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeTab === 'favorites') {
      setFavoritesLoading(true);
      setFavoritesError(null);
      favoritesAPI.listWithDetails()
        .then(setFavorites)
        .catch(() => setFavoritesError('No se pudieron cargar los favoritos.'))
        .finally(() => setFavoritesLoading(false));
    }
  }, [activeTab]);

  // Efecto para la redirección
  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.replace('http://localhost:3000');
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [redirecting]);

  const handleTabChange = (tab: TabType) => setActiveTab(tab);
  const handleEditProfile = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleSubmitProfile = async (data: ProfileFormData) => {
    try {
      const userData = {
        ...user,
        ...data,
        user_id: user.user_id
      };

      if (!data.password) {
        userData.password = '';
      }

      const response = await usersAPI.update(userData);
      // La respuesta de la API puede venir en dos formatos, manejamos ambos casos
      const userToSet = (response as any).user || response;

      // Si se actualizó la contraseña, redirigir
      if (data.password) {
        setRedirecting(true);
        return;
      }

      // Inicializar el usuario con los datos actualizados
      setUser({
        ...user,
        ...userToSet,
        password: '',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  if (redirecting) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-pixela-primary">
        <FiLoader className="w-8 h-8 mb-4 animate-spin" />
        <span className="text-lg font-semibold">Contraseña cambiada, redirigiendo al login...</span>
      </div>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-page__container">
        <h1 className="profile-page__title">Mi Cuenta</h1>
        <p className="profile-page__welcome text-gray-400 mb-6">
          ¡Bienvenido/a, <span className="text-pixela-accent font-medium">{user.name}</span>! Aquí puedes gestionar tu perfil y preferencias.
        </p>
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isAdmin={user.is_admin ?? false}
        />
        <div className="profile-page__content">
          {activeTab === 'profile' && !isEditing && (
            <div className="profile-page__profile-section">
              <div className="profile-page__profile-grid">
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
                <div className="profile-page__info-column">
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
                  className="px-4 py-1.5 flex items-center justify-center rounded-md bg-pixela-accent text-white text-sm font-medium hover:bg-pixela-accent/90 transition-colors"
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
              <ProfileUsers refresh={refreshUsers} />
            </ContentPanel>
          )}
        </div>
      </div>
    </main>
  );
};

async function getUserData(): Promise<UserResponse> {
  try {
    const userData = await authAPI.getUser();
    if (!userData) throw new Error('No se pudieron obtener los datos del usuario');

    // Mapear UserResponse a User
    return {
      user_id: userData.user_id,
      name: userData.name,
      email: userData.email,
      photo_url: userData.photo_url,
      is_admin: userData.is_admin,
      password: userData.password,
      created_at: userData.created_at,
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error;
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
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