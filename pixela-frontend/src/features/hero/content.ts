/**
 * Tipo que define la estructura de datos para la sección Hero de la página principal.
 * @property {string} title - Título principal del hero
 * @property {string} accentTitle - Título acentuado que complementa al título principal
 * @property {string} description - Descripción detallada de la sección
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} images - Array de URLs de imágenes para el fondo del hero
 */
type HeroData = {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images: string[];
};

/**
 * Datos estáticos para la sección Hero.
 * Estos datos se combinan con imágenes dinámicas en page.tsx
 * para crear el contenido final del hero.
 */
export const heroData: HeroData = {
  title: "Explora el universo",
  accentTitle: "cinematográfico",
  description: "Descubre, colecciona y comparte experiencias audiovisuales en una comunidad de apasionados del cine y las series.",
  secondaryButtonText: "Descubrir más",
  images: [],
};