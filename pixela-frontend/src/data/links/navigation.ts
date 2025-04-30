//* Este documento tiene el objetivo de tener los enlaces de las navegaciones de la aplicacion
//* para centrarlizar la logica de las navegaciones

export interface NavLink {
  href: string;
  label: string;
  icon?: string; 
}

// Enlaces de la barra de navegación principal
export const mainNavLinks: NavLink[] = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/tendencias",
    label: "Tendencias",
  },
  {
    href: "/categories",
    label: "Categorías",
  },
  {
    href: "/discover",
    label: "Discover",
  },
];

//TODO: Agregar los enlaces de la barra de navegación del footer o necesarios para la aplicacion