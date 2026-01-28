/**
 * Interfaz que define la estructura del contenido del hero
 * @interface HeroContent
 * @property {string} title - Título del hero
 * @property {string} accentTitle - Título del hero
 * @property {string} description - Descripción del hero
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} images - Imágenes del hero
 * @property {number} currentImageIndex - Índice de la imagen actual
 */
export interface HeroContent {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images: string[];
  currentImageIndex?: number;
}

/**
 * Interfaz para las propiedades del título del hero
 * @interface HeroTitleProps
 * @property {string} title - Título principal
 * @property {string} accentTitle - Título con acento
 */
export interface HeroTitleProps {
  title: string;
  accentTitle: string;
}

/**
 * Interfaz que define la estructura de los datos del hero
 * @interface HeroData
 * @property {string} title - Título principal
 * @property {string} accentTitle - Título con acento
 * @property {string} description - Descripción del hero
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} images - Array de URLs de imágenes
 */
export interface HeroData {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images: string[];
}

/**
 * Interfaz para las propiedades de la línea de acento
 * @interface AccentLineProps
 * @property {string} [className] - Clases CSS opcionales
 */
export interface AccentLineProps {
  className?: string;
}

/**
 * Interfaz para las propiedades del botón secundario
 * @interface SecondaryButtonProps
 * @property {string} text - Texto del botón
 * @property {string} href - URL de destino
 */
export interface SecondaryButtonProps {
  text: string;
  href: string;
}

/**
 * Props para el componente ImageCarousel
 * @property {string[]} images - Array de URLs de imágenes para el carrusel
 */
export interface ImageCarouselProps {
  images: string[];
}

/**
 * Props para el componente HeroSection
 * @property {string} title - Título principal del hero
 * @property {string} accentTitle - Título acentuado que complementa al título principal
 * @property {string} description - Descripción detallada de la sección
 * @property {string} secondaryButtonText - Texto del botón secundario
 * @property {string[]} [images] - Array opcional de URLs de imágenes para el carrusel
 */
export interface HeroSectionProps {
  title: string;
  accentTitle: string;
  description: string;
  secondaryButtonText: string;
  images?: string[];
}

/**
 * Props para el componente NavigationControls
 * @property {number} imagesLength - Número total de imágenes en el carrusel
 */
export interface NavigationControlsProps {
  imagesLength: number;
}

/**
 * Props para el componente NavigationButton
 * @property {'prev' | 'next'} direction - Dirección del botón de navegación
 * @property {() => void} onClick - Función que se ejecuta al hacer clic en el botón
 */
export interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

/**
 * Tipo que representa un medio audiovisual (película o serie)
 * @property {string} id - Identificador único del medio
 * @property {'movie' | 'serie'} type - Tipo de medio (película o serie)
 */
export type MediaItem = {
  id: string;
  type: 'movie' | 'serie';
};

/**
 * Props para el componente ProgressIndicator
 * @property {string[]} images - Array de URLs de imágenes para el carrusel
 */
export interface ProgressIndicatorProps {
  images: string[];
}

/**
 * Tipo que representa la respuesta de la API para un medio
 * @property {string} [backdrop] - URL opcional del fondo del medio
 */
export type MediaResponse = {
  backdrop?: string;
}; 