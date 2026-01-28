import { Media } from ".";

/**
 * Respuesta de imagen individual de la API
 * @interface ApiImageResponse
 * @property {string} url - URL de la imagen
 * @property {number} [ancho] - Ancho de la imagen
 * @property {number} [alto] - Alto de la imagen
 */
export interface ApiImageResponse {
  url: string;
  ancho?: number;
  alto?: number;
}

/**
 * Datos de imágenes de la API
 * @interface ApiImagesData
 * @property {ApiImageResponse[]} [backdrops] - Array de imágenes de fondo
 * @property {ApiImageResponse[]} [posters] - Array de pósters
 */
export interface ApiImagesData {
  backdrops?: ApiImageResponse[];
  posters?: ApiImageResponse[];
}

/**
 * Respuesta completa de la API
 * @interface ApiResponse
 * @property {boolean} success - Indica si la petición fue exitosa
 * @property {ApiImagesData} data - Datos de las imágenes
 */
export interface ApiResponse {
  success: boolean;
  data: ApiImagesData;
}

/**
 * Imagen de fondo
 * @interface Wallpaper
 * @property {string} file_path - Ruta del archivo
 * @property {number} width - Ancho de la imagen
 * @property {number} height - Alto de la imagen
 * @property {number} aspect_ratio - Relación de aspecto
 * @property {number} vote_average - Puntuación media
 * @property {number} vote_count - Número de votos
 */
export interface Wallpaper {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

/**
 * Respuesta de las wallpapers
 * @interface WallpapersResponse
 * @property {Wallpaper[]} backdrops - Imágenes de fondo
 * @property {Wallpaper[]} posters - Imágenes de la película o serie
 * @property {Wallpaper[]} logos - Logos de la película o serie
 */
export interface WallpapersResponse {
  backdrops: Wallpaper[];
  posters: Wallpaper[];
  logos: Wallpaper[];
}

/**
 * Propiedades de las wallpapers
 * @interface WallpapersProps
 * @property {number} mediaId - ID de la película o serie
 * @property {string} mediaType - Tipo de película o serie
 */ 
export interface WallpapersProps {
  mediaId: number;
  mediaType: 'movie' | 'series';
}

/**
 * Props para el componente GalleryGrid
 * @interface GalleryGridProps
 * @property {Wallpaper[]} images - Array de imágenes a mostrar
 * @property {'backdrops' | 'posters'} type - Tipo de imágenes a mostrar
 * @property {(image: Wallpaper) => void} onImageClick - Función que se ejecuta al hacer clic en una imagen
 * @property {boolean} [showAll] - Indica si se deben mostrar todas las imágenes
 */
export interface GalleryGridProps {
  images: Wallpaper[];
  type: 'backdrops' | 'posters';
  onImageClick: (image: Wallpaper) => void;
  showAll?: boolean;
}

/**
 * Props para el componente GallerySection
 * @interface GallerySectionProps
 * @property {Media} media - Objeto que contiene la información de la película o serie
 */
export interface GallerySectionProps {
  media: Media;
}

/**
 * Props para el componente GalleryTabs
 * @interface GalleryTabsProps
 * @property {'backdrops' | 'posters'} activeTab - Pestaña activa actualmente
 * @property {(tab: 'backdrops' | 'posters') => void} onTabChange - Función que se ejecuta al cambiar de pestaña
 * @property {number} backdropsCount - Número de fondos disponibles
 * @property {number} postersCount - Número de pósters disponibles
 */
export interface GalleryTabsProps {
  activeTab: 'backdrops' | 'posters';
  onTabChange: (tab: 'backdrops' | 'posters') => void;
  backdropsCount: number;
  postersCount: number;
}