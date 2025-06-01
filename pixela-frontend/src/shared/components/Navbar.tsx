'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { FiUser, FiX } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState, useEffect } from 'react';
import { mainNavLinks } from '@/data/links/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

const STYLES = {
  nav: 'w-full fixed top-0 left-0 z-50 mt-5 px-4',
  container: 'w-full max-w-[83.333%] mx-auto flex items-center p-4 max-sm:px-3 max-sm:w-[calc(100%-2rem)] bg-dark-opacity backdrop-blur-sm rounded-[36px]',
  logo: 'mx-10 sm:mx-2 md:mx-6 lg:mx-10',
  logoText: 'text-3xl font-bold font-outfit text-pixela-accent',
  navLinks: 'hidden lg:flex flex-1 justify-center', 
  navLinksContainer: 'flex space-x-8',
  navLink: 'font-pixela-outfit-sm text-pixela-light relative group',
  navLinkUnderline: 'absolute bottom-0 left-0 w-0 h-0.5 bg-pixela-accent transition-all duration-300 group-hover:w-full',
  userSection: 'hidden lg:flex mx-10 items-center',
  userContainer: 'flex items-center gap-2',
  userName: 'text-pixela-light font-pixela-outfit-sm',
  button: 'text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 p-2 rounded-full hover:bg-pixela-dark/30',
  divider: 'mx-2 h-6 w-0.5 bg-pixela-light/20',

  // Estilos para el menú hamburguesa
  mobileMenuButton: 'lg:hidden text-pixela-light hover:text-pixela-accent p-2 rounded-full shadow-lg transition-all duration-300 mr-3 ml-auto',
  mobileMenu: 'fixed inset-0 bg-pixela-dark/95 backdrop-blur-lg z-50 flex flex-col justify-center items-start p-6 sm:p-8 lg:p-16 transform transition-transform duration-300',
  mobileMenuVisible: 'translate-y-0',
  mobileMenuHidden: 'translate-y-full',
  mobileCloseButton: 'absolute top-6 right-6 text-pixela-light hover:text-pixela-accent p-2',
  mobileNavLink: 'font-outfit font-black text-5xl sm:text-4xl text-pixela-light hover:text-pixela-accent py-3 pl-4 sm:pl-8 transition-colors duration-300 text-left w-full',
  mobileNavContainer: 'flex flex-col items-start w-full space-y-2 sm:space-y-8 pl-2 sm:pl-6',
  mobileUserSection: 'mt-8 sm:mt-12 flex flex-col items-start w-full space-y-4 sm:space-y-6',
  mobileUserContainer: 'flex flex-col items-start gap-4 sm:gap-5 w-full pl-2 sm:pl-6',
  mobileUserName: 'text-xl sm:text-2xl font-outfit font-bold text-pixela-light mb-2 pl-4 sm:pl-8',
  mobileActionButton: 'flex items-center justify-start gap-3 text-pixela-light hover:text-pixela-accent transition-colors duration-300 py-2 sm:py-3 pl-4 sm:pl-8 rounded-full hover:bg-transparent w-full bg-gradient-to-r from-pixela-accent/10 to-pixela-accent/5 shadow-sm shadow-pixela-accent/5 border border-pixela-accent/20',
  mobileActionText: 'text-lg sm:text-xl font-outfit',
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
 * Versión móvil del botón de acción con texto e icono
 */
const MobileActionButton = ({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ElementType;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={STYLES.mobileActionButton}
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
    <span className={STYLES.mobileActionText}>{label}</span>
  </button>
);

/**
 * Barra de navegación principal de la aplicación
 */
export const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const logout = useAuthStore((s) => s.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Bloquear el scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      router.push('/profile');
      setMobileMenuOpen(false);
    } else {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logout();
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
        e.preventDefault();
        const sectionId = href.replace('/#', '');
        
        if (window.location.pathname !== '/') {
            window.location.href = href;
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }
    closeMobileMenu();
  };

  return (
    <>
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
                  onClick={(e) => handleNavClick(e, link.href)}
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

          {/* Botón de menú hamburguesa para móviles */}
          <button 
            className={STYLES.mobileMenuButton} 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            <RxHamburgerMenu className="h-8 w-8" />
          </button>
        </div>
      </nav>

      {/* Menú móvil a pantalla completa */}
      <div className={`${STYLES.mobileMenu} ${mobileMenuOpen ? STYLES.mobileMenuVisible : STYLES.mobileMenuHidden}`}>
        <button 
          className={STYLES.mobileCloseButton} 
          onClick={closeMobileMenu}
          aria-label="Cerrar menú"
        >
          <FiX className="h-8 w-8" />
        </button>

        {/* Enlaces de navegación para móvil */}
        <div className={STYLES.mobileNavContainer}>
          {mainNavLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={STYLES.mobileNavLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sección de usuario para móvil */}
        <div className={STYLES.mobileUserSection}>
          <div className={STYLES.mobileUserContainer}>
            {isAuthenticated && user && (
              <>
                <span className={STYLES.mobileUserName}>{user.name}</span>
                <MobileActionButton
                  onClick={handleProfile}
                  icon={FiUser}
                  label="Perfil"
                />
              </>
            )}
            {!isAuthenticated && (
              <MobileActionButton
                onClick={handleProfile}
                icon={FiUser}
                label="Iniciar sesión"
              />
            )}
            
            {isAuthenticated && !isLoading && (
              <MobileActionButton
                onClick={handleLogout}
                icon={MdLogout}
                label="Cerrar sesión"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
