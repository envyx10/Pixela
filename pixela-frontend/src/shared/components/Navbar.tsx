'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { mainNavLinks } from '@/data/links/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

const STYLES = {
  nav: 'w-full fixed top-0 left-0 z-50 mt-5',
  container: 'max-w-[83.333%] mx-auto flex items-center p-4 bg-dark-opacity backdrop-blur-sm rounded-[36px]',
  logo: 'mx-10',
  logoText: 'text-3xl font-bold font-outfit text-pixela-accent',
  navLinks: 'flex-1 flex justify-center',
  navLinksContainer: 'flex space-x-8',
  navLink: 'font-pixela-outfit-sm text-pixela-light relative group',
  navLinkUnderline: 'absolute bottom-0 left-0 w-0 h-0.5 bg-pixela-accent transition-all duration-300 group-hover:w-full',
  userSection: 'mx-10 flex items-center',
  userContainer: 'flex items-center gap-2',
  userName: 'text-pixela-light font-pixela-outfit-sm',
  button: 'text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 p-2 rounded-full hover:bg-pixela-dark/30',
  divider: 'mx-2 h-6 w-0.5 bg-pixela-light/20',
} as const;

/**
 * Botón de acción con icono para la barra de navegación
 */
const NavActionButton = ({
  onClick,
  icon: Icon,
  label,
  title,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ElementType;
  label: string;
  title: string;
}) => (
  <button
    onClick={onClick}
    className={STYLES.button}
    aria-label={label}
    title={title}
  >
    <Icon className="h-6 w-6" />
  </button>
);

/**
 * Barra de navegación principal de la aplicación
 */
export const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const logout = useAuthStore((s) => s.logout);

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      router.push('/profile');
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  };

  return (
    <nav className={STYLES.nav} role="navigation">
      <div className={STYLES.container}>
        <Link href="/" className={STYLES.logo}>
          <h1 className={STYLES.logoText}>Pixela</h1>
        </Link>
        
        <div className={STYLES.navLinks}>
          <div className={STYLES.navLinksContainer}>
            {mainNavLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={STYLES.navLink}
                aria-label={link.label}
              >
                {link.label}
                <span className={STYLES.navLinkUnderline} />
              </Link>
            ))}
          </div>
        </div>

        <div className={STYLES.userSection}>
          <div className={STYLES.userContainer}>
            {isAuthenticated && user && (
              <>
                <span className={STYLES.userName}>
                  {user.name}
                </span>
                <NavActionButton
                  onClick={handleProfile}
                  icon={FiUser}
                  label="Perfil"
                  title="Perfil"
                />
              </>
            )}
            {!isAuthenticated && (
              <NavActionButton
                onClick={handleProfile}
                icon={FiUser}
                label="Iniciar sesión"
                title="Iniciar sesión"
              />
            )}
          </div>
          
          {isAuthenticated && !isLoading && (
            <>
              <div className={STYLES.divider} />
              <NavActionButton
                onClick={handleLogout}
                icon={MdLogout}
                label="Cerrar sesión"
                title="Cerrar sesión"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
