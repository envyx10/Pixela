import { FooterLink } from '../types/links';

// Enlaces para las columnas - Extraídos como constantes para evitar re-creación en cada render
export const DISCOVER_LINKS: FooterLink[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Tendencias', href: '/#trending' },
  { name: 'Descubre', href: '/#discover' },
  { name: 'Categorías', href: '/categories' },
  { name: 'Sobre Nosotros', href: '/#about' }
];

export const COMMUNITY_LINKS: FooterLink[] = [
  { name: 'Reseñas', href: '/reviews' },
  { name: 'Favoritos', href: '/favorites' },
  { name: 'Listas', href: '/lists' },
  { name: 'Perfil', href: '/profile' }
];

export const LEGAL_LINKS: FooterLink[] = [
  { name: 'Términos', href: '/terms' },
  { name: 'Privacidad', href: '/privacy' },
  { name: 'Cookies', href: '/cookies' },
  { name: 'Contacto', href: '/contact' }
]; 