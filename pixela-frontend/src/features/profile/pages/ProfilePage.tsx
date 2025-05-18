'use client';

import { useState, useEffect } from 'react';
import { UserResponse } from '@/api/auth/types';
import { ProfileFormData } from '@/features/profile/types/profileTypes';
import { authAPI } from '@/api/auth/auth';
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
import { clsx } from 'clsx';

import '@/styles/profile/main.scss';

const STYLES = {
  container: 'profile-page',
  content: 'profile-page__content',
  title: 'profile-page__title',
  welcome: 'profile-page__welcome text-gray-400 mb-6',
  profileSection: 'profile-page__profile-section',
  profileGrid: 'profile-page__profile-grid',
  avatarColumn: (scrolled: boolean) => clsx(
    'profile-page__avatar-column avatar-scroll-effect',
    { scrolled }
  ),
  infoColumn: 'profile-page__info-column',
  addUserButton: 'px-4 py-1.5 flex items-center justify-center rounded-md bg-pixela-accent text-white text-sm font-medium hover:bg-pixela-accent/90 transition-colors',
  loadingContainer: 'flex flex-col items-center justify-center p-8 text-pixela-primary',
  loadingSpinner: 'w-8 h-8 mb-4 animate-spin',
  loadingText: 'text-lg font-semibold'
} as const;

type TabType = 'profile' | 'reviews' | 'favorites' | 'users';

interface ProfileClientProps {
  user: UserResponse;
}

const ProfileClient = ({ user: initialUser }: ProfileClientProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserResponse>(initialUser);
  const [redirecting, setRedirecting] = useState(false);
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
        user_id: user.user_id,
        name: data.name,
        email: data.email,
        password: data.password || '',
        photo_url: data.photo_url || user.photo_url,
        is_admin: user.is_admin,
        created_at: user.created_at,
        updated_at: new Date().toISOString()
      } as UserResponse;

      const updatedUser = await usersAPI.update(userData);
      const userToSet = 'user' in updatedUser ? updatedUser.user : updatedUser;

      if (data.password) {
        setRedirecting(true);
        return;
      }

      setUser(userToSet as UserResponse);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  if (redirecting) {
    return (
      <div className={STYLES.loadingContainer}>
        <FiLoader className={STYLES.loadingSpinner} />
        <span className={STYLES.loadingText}>Contraseña cambiada, redirigiendo al login...</span>
      </div>
    );
  }

  return (
    <main className={STYLES.container}>
      <div className="profile-page__container">
        <h1 className={STYLES.title}>Mi Cuenta</h1>
        <p className={STYLES.welcome}>
          ¡Bienvenido/a, <span className="text-pixela-accent font-medium">{user.name}</span>! Aquí puedes gestionar tu perfil y preferencias.
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
                  <h3 className="user-avatar__name">{user.name}</h3>
                  <p className="user-avatar__role">
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