

/**
 * Interfaz para los enlaces de la barra de navegación
 * @interface NavLink
 * @property {string} href - URL del enlace
 * @property {string} label - Texto del enlace
 * @property {string} icon - Icono del enlace
 */ 
export interface NavLink {
  href: string;
  label: string;
  icon?: string; 
}

/**
 * Enlaces de la barra de navegación principal
 * @type {NavLink[]}
 */
export const mainNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/#trending",
    label: "Tendencias",
  },
  {
    href: "/#discover",
    label: "Descubre",
  },
  {
    href: "/categories",
    label: "Categorías",
  },
  {
    href: "/#about",
    label: "Sobre Nosotros",
  },
];

