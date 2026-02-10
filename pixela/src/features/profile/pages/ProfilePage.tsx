"use client";

import { useState, useEffect } from "react";
import { UserResponse } from "@/api/auth/types";
import { User } from "@/api/users/types";
import { ProfileFormData } from "@/features/profile/types/profileTypes";
import { authAPI } from "@/api/auth/auth";
import { usersAPI } from "@/api/users/users";
import { favoritesAPI } from "@/api/favorites/favorites";
import { reviewsAPI } from "@/api/reviews/reviews";
import { useAuthStore } from "@/stores/useAuthStore";
import { ProfileFavorites } from "../components/layout/ProfileFavorites";
import { ProfileReviews } from "../components/layout/ProfileReviews";
import { ProfileUsers } from "../components/layout/ProfileUsers";
import { ProfileLibrary } from "../components/layout/ProfileLibrary";
import {
  ProfileError,
  ContentPanel,
  UserAvatar,
  ProfileInfo,
  UpdateProfileForm,
} from "@/features/profile/components";
import {
  FiLoader,
  FiSettings,
  FiUsers,
  FiHeart,
  FiStar,
  FiActivity,
  FiGrid,
} from "react-icons/fi";
import { FaRegBookmark, FaRegComments } from "react-icons/fa";
import { UserCreateModal } from "../components/form/UserCreateModal";
import { clsx } from "clsx";
import { TabType } from "@/features/profile/types/tabs";
import { ProfileClientProps } from "@/features/profile/types/profileTypes";

const STYLES = {
  // Contenedores principales
  pageWrapper: "min-h-screen bg-[#0F0F0F] relative overflow-x-hidden",

  // Hero Section (Premium Look)
  heroSection: "relative h-[40vh] min-h-[300px] w-full isolate",
  heroBackground: "absolute inset-0 z-0",
  heroGradient:
    "absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent z-10",
  heroImage: "w-full h-full object-cover opacity-50",
  heroContent: "absolute -bottom-16 left-0 w-full z-20",

  // Header User Info (Overlapping Hero)
  userInfoContainer:
    "max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 pb-4 px-4 md:px-8 w-full",
  avatarWrapper: "relative group",
  avatarRing: "hidden",
  avatarContainer:
    "relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0F0F0F] shadow-2xl overflow-hidden bg-[#1A1A1A]",
  userDetails: "flex-1 text-center md:text-left mb-2",
  userName:
    "text-4xl md:text-5xl font-bold text-white font-outfit mb-2 tracking-tight drop-shadow-lg",
  userBadges: "flex flex-wrap justify-center md:justify-start gap-3",
  badge:
    "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border",
  badgeAdmin: "bg-pixela-accent/20 border-pixela-accent/50 text-pixela-accent",
  badgeUser: "bg-white/10 border-white/20 text-gray-300",

  // Stats Bar
  statsContainer: "max-w-7xl mx-auto px-4 md:px-8 mt-20 mb-12",
  statsGrid: "grid grid-cols-2 md:grid-cols-4 gap-4",
  statCard:
    "bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-300 group",
  statValue:
    "text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform font-outfit",
  statLabel:
    "text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2",
  statIcon: "w-4 h-4 text-pixela-accent",

  // Main Content Area
  mainContent: "max-w-7xl mx-auto px-4 md:px-8 pb-20",

  // Tabs (Premium Style)
  tabsContainer:
    "flex flex-wrap justify-center md:justify-start gap-2 mb-10 border-b border-white/10 pb-1",
  tabButton: (isActive: boolean) =>
    clsx(
      "px-6 py-3 text-sm font-medium transition-all duration-300 relative",
      isActive ? "text-white" : "text-gray-400 hover:text-white",
    ),
  tabIndicator: (isActive: boolean) =>
    clsx(
      "absolute bottom-0 left-0 w-full h-0.5 bg-pixela-accent shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-300",
      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
    ),
  tabIcon: "inline-block mr-2 text-lg relative top-[-1px]",

  // Content Layout
  contentWrapper: "min-h-[400px] animate-fade-in",

  // Botones Generales
  actionButton:
    "px-5 py-2 rounded-lg font-medium transition-all duration-300 transform active:scale-95 flex items-center gap-2",
  primaryButton:
    "bg-pixela-accent text-white hover:bg-pixela-accent/90 shadow-lg shadow-pixela-accent/20",

  // Notificaciones
  notification:
    "fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in backdrop-blur-md border border-white/10",
  notificationSuccess: "bg-green-500/10 border-green-500/20 text-green-400",
  notificationError: "bg-red-500/10 border-red-500/20 text-red-400",

  // Loading/Redirect Overlay
  loadingOverlay:
    "fixed inset-0 bg-[#0F0F0F]/90 backdrop-blur-xl z-[100] flex flex-col items-center justify-center",
} as const;

/**
 * Componente de perfil del cliente
 */
const ProfileClient = ({ user: initialUser }: ProfileClientProps) => {
  const updateUser = useAuthStore((state) => state.updateUser);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserResponse>(initialUser);
  const [redirecting, setRedirecting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-hide notifications
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle redirect
  useEffect(() => {
    if (redirecting) {
      const timer = setTimeout(() => {
        window.location.replace("http://localhost:3000");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [redirecting]);

  const handleSubmitProfile = async (data: ProfileFormData) => {
    try {
      // Construct payload with ONLY updatable fields
      const payload: Partial<UserResponse> = {
        user_id: user.user_id, // Required for URL construction in API
        name: data.name,
        email: data.email,
        photo_url:
          data.photo_url !== undefined ? data.photo_url : user.photo_url,
        cover_url:
          data.cover_url !== undefined ? data.cover_url : user.cover_url,
      };

      if (data.password && data.password.trim()) {
        payload.password = data.password;
      }

      // Cast to UserResponse to satisfy TS, but runtime JSON will only have above fields
      const updatedUser = await usersAPI.update(payload as UserResponse);
      const userToSet = "user" in updatedUser ? updatedUser.user : updatedUser;

      if (data.password && data.password.trim()) {
        setRedirecting(true);
        return;
      }

      setUser(userToSet as UserResponse);
      updateUser(userToSet as UserResponse);
      setIsEditing(false);
      setSuccessMessage("¡Perfil actualizado correctamente!");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      setSuccessMessage(
        error instanceof Error ? error.message : "Error al actualizar",
      );
    }
  };

  const handleUserUpdated = (updatedUser: User) => {
    if (updatedUser.user_id === user.user_id) {
      const userResponse: UserResponse = {
        ...user,
        ...updatedUser,
        password: updatedUser.password || "",
      };
      setUser(userResponse);
      updateUser(userResponse);
    }
    setRefreshUsers((r) => !r);
  };

  // Real stats state
  const [stats, setStats] = useState([
    { label: "Favoritos", value: "0", icon: FiHeart },
    { label: "Reseñas", value: "0", icon: FiStar },
    { label: "Nivel", value: "Novato", icon: FiActivity },
  ]);

  // Fetch real stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [favorites, reviews] = await Promise.all([
          favoritesAPI.listWithDetails(),
          reviewsAPI.list(),
        ]);

        const favCount = favorites.length;
        const reviewCount = reviews.length;

        // Determine level based on activity
        let level = "Novato";
        if (reviewCount > 5 || favCount > 10) level = "Aficionado";
        if (reviewCount > 15 || favCount > 30) level = "Cinéfilo";
        if (reviewCount > 30 || favCount > 50) level = "Crítico";
        if (reviewCount > 50 || favCount > 100) level = "Maestro";

        setStats([
          { label: "Favoritos", value: favCount.toString(), icon: FiHeart },
          { label: "Reseñas", value: reviewCount.toString(), icon: FiStar },
          { label: "Nivel", value: level, icon: FiActivity },
        ]);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    fetchStats();
  }, [activeTab]);

  if (redirecting) {
    return (
      <div className={STYLES.loadingOverlay}>
        <FiLoader className="w-12 h-12 text-pixela-accent animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Actualizando seguridad...
        </h2>
        <p className="text-gray-400">
          Te estamos redirigiendo para iniciar sesión.
        </p>
      </div>
    );
  }

  return (
    <main className={STYLES.pageWrapper}>
      {/* Toast Notification */}
      {successMessage && (
        <div
          className={clsx(
            STYLES.notification,
            successMessage.includes("Error")
              ? STYLES.notificationError
              : STYLES.notificationSuccess,
          )}
        >
          {successMessage.includes("Error") ? (
            <FiActivity className="w-5 h-5" />
          ) : (
            <FiStar className="w-5 h-5" />
          )}
          <span>{successMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className={STYLES.heroSection}>
        <div className={STYLES.heroBackground}>
          {/* Dynamic Banner */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url('${user.cover_url || "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2831&auto=format&fit=crop"}')`,
              opacity: 0.4,
            }}
          />
          <div className={STYLES.heroGradient} />
        </div>

        <div className={STYLES.heroContent}>
          <div className={STYLES.userInfoContainer}>
            <div className={STYLES.avatarWrapper}>
              <div className={STYLES.avatarRing} />
              <div className={STYLES.avatarContainer}>
                <UserAvatar
                  profileImage={user.photo_url}
                  name={user.name}
                  size="full"
                  className="!mb-0 !border-0"
                />
              </div>
            </div>

            <div className={STYLES.userDetails}>
              <h1 className={STYLES.userName}>{user.name}</h1>
              <div className={STYLES.userBadges}>
                <span
                  className={clsx(
                    STYLES.badge,
                    user.is_admin ? STYLES.badgeAdmin : STYLES.badgeUser,
                  )}
                >
                  {user.is_admin ? "Admin" : "Miembro"}
                </span>
                <span className={clsx(STYLES.badge, STYLES.badgeUser)}>
                  Unido en{" "}
                  {!isNaN(new Date(user.created_at).getTime())
                    ? new Date(user.created_at).getFullYear()
                    : new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className={STYLES.statsContainer}>
        <div className={STYLES.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={STYLES.statCard}>
              <stat.icon className={STYLES.statIcon} />
              <span className={STYLES.statValue}>{stat.value}</span>
              <span className={STYLES.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={STYLES.mainContent}>
        {/* Navigation Tabs */}
        <div className={STYLES.tabsContainer}>
          {[
            { id: "profile", label: "General", icon: FiSettings },
            { id: "library", label: "Biblioteca", icon: FiGrid },
            { id: "reviews", label: "Reseñas", icon: FaRegComments },
            { id: "favorites", label: "Favoritos", icon: FaRegBookmark },
            ...(user.is_admin
              ? [{ id: "users", label: "Usuarios", icon: FiUsers }]
              : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={STYLES.tabButton(activeTab === tab.id)}
            >
              <tab.icon className={STYLES.tabIcon} />
              {tab.label}
              <div className={STYLES.tabIndicator(activeTab === tab.id)} />
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className={STYLES.contentWrapper}>
          {activeTab === "profile" && !isEditing && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="lg:col-span-2">
                <ProfileInfo
                  user={{ ...user, user_id: user.user_id }}
                  onEdit={() => setIsEditing(true)}
                />
              </div>
              <div className="space-y-6">
                <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-4 font-outfit">
                    Actividad Reciente
                  </h3>
                  <p className="text-gray-500 text-sm">
                    No hay actividad reciente para mostrar.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && isEditing && (
            <div className="w-full animate-fade-in">
              <UpdateProfileForm
                initialData={{
                  name: user.name,
                  email: user.email,
                  photo_url: user.photo_url,
                }}
                onCancel={() => setIsEditing(false)}
                onSubmit={handleSubmitProfile}
              />
            </div>
          )}

          {activeTab === "library" && (
            <ContentPanel title="Tu Biblioteca">
              <ProfileLibrary />
            </ContentPanel>
          )}

          {activeTab === "reviews" && (
            <ContentPanel title="Tus Reseñas">
              <ProfileReviews
                onStatsUpdate={() => {
                  // Trigger a re-fetch of stats
                  const fetchStats = async () => {
                    try {
                      const [favorites, reviews] = await Promise.all([
                        favoritesAPI.listWithDetails(),
                        reviewsAPI.list(),
                      ]);

                      const favCount = favorites.length;
                      const reviewCount = reviews.length;

                      // Determine level based on activity
                      let level = "Novato";
                      if (reviewCount > 5 || favCount > 10)
                        level = "Aficionado";
                      if (reviewCount > 15 || favCount > 30) level = "Cinéfilo";
                      if (reviewCount > 30 || favCount > 50) level = "Crítico";
                      if (reviewCount > 50 || favCount > 100) level = "Maestro";

                      setStats([
                        {
                          label: "Favoritos",
                          value: favCount.toString(),
                          icon: FiHeart,
                        },
                        {
                          label: "Reseñas",
                          value: reviewCount.toString(),
                          icon: FiStar,
                        },
                        { label: "Nivel", value: level, icon: FiActivity },
                      ]);
                    } catch (error) {
                      console.error("Error loading stats:", error);
                    }
                  };
                  fetchStats();
                }}
              />
            </ContentPanel>
          )}

          {activeTab === "favorites" && (
            <ContentPanel title="Lista de Favoritos">
              <ProfileFavorites
                onStatsUpdate={() => {
                  // Trigger a re-fetch of stats
                  const fetchStats = async () => {
                    try {
                      const [favorites, reviews] = await Promise.all([
                        favoritesAPI.listWithDetails(),
                        reviewsAPI.list(),
                      ]);

                      const favCount = favorites.length;
                      const reviewCount = reviews.length;

                      // Determine level based on activity
                      let level = "Novato";
                      if (reviewCount > 5 || favCount > 10)
                        level = "Aficionado";
                      if (reviewCount > 15 || favCount > 30) level = "Cinéfilo";
                      if (reviewCount > 30 || favCount > 50) level = "Crítico";
                      if (reviewCount > 50 || favCount > 100) level = "Maestro";

                      setStats([
                        {
                          label: "Favoritos",
                          value: favCount.toString(),
                          icon: FiHeart,
                        },
                        {
                          label: "Reseñas",
                          value: reviewCount.toString(),
                          icon: FiStar,
                        },
                        { label: "Nivel", value: level, icon: FiActivity },
                      ]);
                    } catch (error) {
                      console.error("Error loading stats:", error);
                    }
                  };
                  fetchStats();
                }}
              />
            </ContentPanel>
          )}

          {activeTab === "users" && user.is_admin && (
            <ContentPanel
              title="Gestión de Usuarios"
              headerAction={
                <button
                  className={STYLES.primaryButton}
                  onClick={() => setShowCreateModal(true)}
                >
                  <FiUsers className="w-5 h-5" />
                  Nuevo Usuario
                </button>
              }
            >
              <UserCreateModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onUserCreated={() => {
                  setRefreshUsers((r) => !r);
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

// ... Data fetching helper (getUserData) remains the same ...

// function getUserData removed as it was unused

export default function ProfilePage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authAPI
      .getUser()
      .then((response: UserResponse | { user: UserResponse }) => {
        interface UserWithId {
          user_id?: string | number;
          id?: string | number;
          name?: string;
          email?: string;
          photo_url?: string;
          cover_url?: string;
          image?: string;
          is_admin?: boolean;
          password?: string;
          created_at?: string;
          updated_at?: string;
        }
        const userData = ("user" in response
          ? response.user
          : response) as unknown as UserWithId;
        setUser({
          user_id: Number(userData.user_id || userData.id) || 0,
          name: userData.name || "Usuario",
          email: userData.email || "",
          photo_url: userData.photo_url || userData.image || "",
          cover_url: userData.cover_url || "",
          is_admin: userData.is_admin || false,
          password: userData.password || "",
          created_at: userData.created_at || new Date().toISOString(),
          updated_at: userData.updated_at || new Date().toISOString(),
        });
      })
      .catch(() => setError("Error de carga"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <FiLoader className="w-10 h-10 text-pixela-accent animate-spin" />
      </div>
    );
  if (error) return <ProfileError message={error || "Error desconocido"} />;
  if (!user) return <ProfileError message="No hay datos" />;

  return <ProfileClient user={user} />;
}
